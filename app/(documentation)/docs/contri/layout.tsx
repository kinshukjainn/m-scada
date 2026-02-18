import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guidlines to contribute ",
  description:
    "A deep and detailed guidelines on how can someone contribute to our project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
