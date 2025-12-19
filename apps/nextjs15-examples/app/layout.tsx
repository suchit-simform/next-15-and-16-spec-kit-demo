import type { Metadata } from "next";
import { ExampleLayout } from "@shared/components/ExampleLayout";
import { Header } from "@shared/components/Header";
import { Footer } from "@shared/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js 15 Pattern Examples",
  description: "Explore Next.js 15 features and pattern changes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header version={15} />
        <ExampleLayout version={15}>{children}</ExampleLayout>
        <Footer />
      </body>
    </html>
  );
}
