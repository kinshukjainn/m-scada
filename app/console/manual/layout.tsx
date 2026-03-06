import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manual Console ||  M-Scada",
  description: "Manual Console of M-Scada",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
