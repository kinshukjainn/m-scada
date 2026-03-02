import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open AI OSS Model 120B Model||FDS ",
  description: "A Breif info about Open AI OSS Model with 120 billion model",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
