import type { Metadata } from "next";
import { ExampleLayout } from "@shared/components/ExampleLayout";
import { Header } from "@shared/components/Header";
import { Footer } from "@shared/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js 16 Pattern Examples",
  description: "Explore Next.js 16 features and pattern changes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header version={16} />
        <ExampleLayout version={16}>{children}</ExampleLayout>
        <Footer />
      </body>
    </html>
  );
}
