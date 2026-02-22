import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request and Response - FDS AI",
  description: "Learn about the request and response handling in FDS AI.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
