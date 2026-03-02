import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { RiGeminiFill } from "react-icons/ri";

// ==========================================
// 1. WEBGL SHADER FOR INTERNAL FLUID
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
    
    // Create fluid distortion based on time (scaled down for smaller container)
    vec2 distortedUv = uv;
    distortedUv.x += noise(uv * 4.0 + uTime * 0.3) * 0.15;
    distortedUv.y += noise(uv * 4.0 - uTime * 0.2) * 0.15;

    // Generate fluid wave patterns
    float wave1 = noise(distortedUv * 5.0 + uTime * 0.4);
    float wave2 = noise(distortedUv * 6.0 - uTime * 0.3);
    
    // Mix colors based on fluid waves
    vec3 fluidColor = mix(uColor1, uColor2, wave1 + 0.5);
    fluidColor = mix(fluidColor, uColor3, wave2 + 0.5);

    // Add a soft radial fade so the center is vibrant but the edges are softer
    float distToCenter = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.6, 0.1, distToCenter);

    // Output final color (0.8 opacity keeps it pastel and lets the white background bleed through)
    gl_FragColor = vec4(fluidColor, vignette * 0.85);
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
interface GeminiFluidInnerProps {
  className?: string;
  size?: number;
  fluidColors?: { c1: string; c2: string; c3: string };
  iconColor?: string;
}

export const GeminiFluidInner: React.FC<GeminiFluidInnerProps> = ({
  className = "",
  size = 120, // Size of the core circle
  fluidColors = {
    c1: "#86abe5", // Google Blue
    c2: "#5f22a5", // Deep Purple
    c3: "#616981", // Soft Coral
  },
  iconColor = "#fefefe", // Blue icon
}) => {
  return (
    <div
      className={`relative flex items-center justify-center p-10 bg-white ${className}`}
    >
      {/* THE CORE BUTTON */}
      <motion.div
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }} // Real physics
        className="relative rounded-full overflow-hidden flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 bg-white cursor-pointer"
      >
        {/* INTERNAL FLUID CANVAS */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
          {/* dpr={[1, 2]} ensures the shader is crisp on high-res retina screens */}
          <Canvas
            camera={{ position: [0, 0, 1] }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
          >
            <FluidMesh colors={fluidColors} />
          </Canvas>
        </div>

        {/* GLASS OVERLAY (Enhances the 3D sphere look) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/5 pointer-events-none z-10" />

        {/* INNER GLOW BORDER */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] pointer-events-none z-10" />

        {/* FOREGROUND ICON */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 3, -3, 0], // Very subtle floating
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 drop-shadow-md"
          style={{ color: iconColor }}
        >
          {/* Sizing the icon relative to the container */}
          <RiGeminiFill size={size * 0.4} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GeminiFluidInner;
