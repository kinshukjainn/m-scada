import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parameters and Configurations | FDS AI",
  description:
    "Learn about the parameters and configurations available in FDS AI. Understand how to customize and optimize your AI models for better performance.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
