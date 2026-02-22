import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Model | FDS AI",
  description: "A very breif introduction to Ai Model used in FDS AI",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
