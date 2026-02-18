import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AWS Services || FDS",
  description:
    "A breif info about what kind of services we used of aws in our project",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
