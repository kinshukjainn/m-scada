import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated/Direct Console || M-Scada",
  description: "Automated console of M-Scada",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
