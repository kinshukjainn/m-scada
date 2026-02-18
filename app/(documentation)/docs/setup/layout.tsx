import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Project Setup",
  description: "Detailed Description about the project setup ",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
