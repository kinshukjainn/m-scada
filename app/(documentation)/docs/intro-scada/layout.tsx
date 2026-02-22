import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction to Scada Software | FDS AI",
  description:
    "A very breif introduction to scada software and how it is used in our project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
