import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { RiGeminiFill } from "react-icons/ri";

// ==========================================
// 1. WEBGL SHADER FOR AZURE-STYLE FLUID/GRADIENT
// ==========================================
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  // 2D Random & Noise functions
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  
  float noise(vec2 p) {
    const float K1 = 0.366025404; 
    const float K2 = 0.211324865; 
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  void main() {
    vec2 uv = vUv;
    
    // Slower, smoother distortion for a professional "data flow" feel
    vec2 distortedUv = uv;
    distortedUv.x += noise(uv * 3.0 + uTime * 0.1) * 0.08;
    distortedUv.y += noise(uv * 3.0 - uTime * 0.12) * 0.08;

    // Generate smooth gradient wave patterns
    float wave1 = noise(distortedUv * 4.0 + uTime * 0.2);
    float wave2 = noise(distortedUv * 4.5 - uTime * 0.15);
    
    // Mix Azure brand colors
    vec3 fluidColor = mix(uColor1, uColor2, wave1 + 0.5);
    fluidColor = mix(fluidColor, uColor3, wave2 + 0.5);

    // Subtle radial fade 
    float distToCenter = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.7, 0.0, distToCenter);

    // Opacity adjusted for a clean, non-overpowering light theme aesthetic
    gl_FragColor = vec4(fluidColor, vignette * 0.90);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ==========================================
// 2. THREE.JS FLUID MESH
// ==========================================
const FluidMesh = ({
  colors,
}: {
  colors: { c1: string; c2: string; c3: string };
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(colors.c1) },
      uColor2: { value: new THREE.Color(colors.c2) },
      uColor3: { value: new THREE.Color(colors.c3) },
    }),
    [colors],
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

// ==========================================
// 3. MAIN EXPORTABLE COMPONENT
// ==========================================
interface AzureFluidInnerProps {
  className?: string;
  size?: number;
  fluidColors?: { c1: string; c2: string; c3: string };
  iconColor?: string;
}

export const AzureFluidInner: React.FC<AzureFluidInnerProps> = ({
  className = "",
  size = 120, // Default tile size
  fluidColors = {
    c1: "#0078D4", // Primary Azure Blue
    c2: "#50E6FF", // Bright Azure Cyan (for highlights)
    c3: "#005A9E", // Darker Azure Blue (for depth)
  },
  iconColor = "#FFFFFF", // Crisp white to contrast the blue
}) => {
  return (
    <div
      className={`relative flex items-center justify-center p-10 bg-[#FAFAFA] ${className}`}
    >
      {/* THE CORE BUTTON / TILE */}
      <motion.div
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 0 }}
        // Fluent Design prefers snappy, low-damping transitions over bouncy springs
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="relative overflow-hidden flex items-center justify-center bg-white cursor-pointer"
        // Azure specific styling: very subtle rounding (2px-4px) and sharp, clean drop shadow
      >
        {/* INTERNAL FLUID CANVAS */}
        <div className="absolute inset-0 z-0 opacity-90">
          <Canvas
            camera={{ position: [0, 0, 1] }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
          >
            <FluidMesh colors={fluidColors} />
          </Canvas>
        </div>

        {/* ACRYLIC/GLASS OVERLAY (Microsoft Fluent style) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-10" />

        {/* INNER BORDER FOR CRISPNESS */}
        <div
          className="absolute inset-0 border border-black/5 pointer-events-none z-10"
          style={{ borderRadius: "2px" }}
        />

        {/* FOREGROUND ICON */}
        <motion.div
          // Removed the infinite wobble/rotation to maintain a professional, corporate feel.
          // Added a very subtle slow pulse instead.
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 drop-shadow-sm"
          style={{ color: iconColor }}
        >
          <RiGeminiFill size={size * 0.45} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AzureFluidInner;
