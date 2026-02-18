import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Info || FDS",
  description: "A Detailed information about FDS.AI project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
