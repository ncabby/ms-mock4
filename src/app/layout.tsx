import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import global from "../../content/global.json";

export const metadata: Metadata = {
  title: `${global.companyName} - an Information Technology Consulting & Solutions Company`,
  description: global.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-navy-900 bg-white overflow-x-hidden">
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
