import type { Metadata } from "next";
import Consoleheader from "../custom-components/Consoleheader";

export const metadata: Metadata = {
  title: "Console - FDS",
  description:
    "FDS Console is a powerful tool designed to provide users with an intuitive interface for managing and monitoring their applications. With its user-friendly dashboard, users can easily access real-time data, configure settings, and perform various administrative tasks. The console offers a seamless experience, allowing users to efficiently oversee their applications' performance and make informed decisions based on the insights provided. Whether you're a developer, administrator, or business owner, FDS Console is your go-to solution for effective application management.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`antialiased bg-white pt-8 lg:pt-6`}>
      <Consoleheader />
      {children}
    </section>
  );
}
