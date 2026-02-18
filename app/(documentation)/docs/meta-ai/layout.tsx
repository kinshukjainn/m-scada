import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Project Info",
  description: "Detailed Description about the project ",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
