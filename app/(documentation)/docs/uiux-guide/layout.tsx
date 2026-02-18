import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX Guidelines || FDS",
  description: "Explained ui/ux guidelines followed in the project ",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
