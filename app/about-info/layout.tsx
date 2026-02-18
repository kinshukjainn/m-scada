import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Info ||  FDS",
  description: "About the project and team",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
