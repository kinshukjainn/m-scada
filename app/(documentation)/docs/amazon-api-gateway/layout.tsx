import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lambda Functional URL ||FDS ",
  description: "What is Lambda functional url",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
