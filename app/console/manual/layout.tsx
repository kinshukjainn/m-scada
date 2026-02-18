import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manual Console ||  FDS",
  description: "Manual Console of FDS",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
