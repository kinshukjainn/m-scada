import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Logs || MScada",
  description: "Live track of project log -- feature push",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
