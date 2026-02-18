import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues || FDS",
  description: "Issues and bugs in fds.ai project ",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
