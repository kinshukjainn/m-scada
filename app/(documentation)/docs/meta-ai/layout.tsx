import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Meta Ai | FDS AI",
  description: "Detailed Description about the Meta Ai Model used in FDS AI",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
