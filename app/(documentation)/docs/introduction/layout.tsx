import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction to FDS AI Console | FDS AI",
  description:
    "A very breif introduction to FDS AI Console and how it is used in our project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
