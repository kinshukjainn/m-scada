import DocsSidebar from "@/app/custom-components/DocsSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Working of Scada",
  description: " Explaination of working of scada tool",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added flex-col for mobile, lg:flex-row for desktop, and relative for mobile positioning
    <section className="relative flex flex-col lg:flex-row h-[calc(100vh-64px)] w-full antialiased overflow-hidden bg-white">
      {/* Sidebar handles its own mobile header and drawer logic */}
      <DocsSidebar />

      {/* Main content area scrolls independently */}
      <main className="flex-1 overflow-y-auto bg-[#1e1e1e] text-[#e0e0e0] selection:bg-[#8cb4ff]/30 selection:text-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </section>
  );
}
