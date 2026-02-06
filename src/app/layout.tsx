import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AppProviders from "@/components/AppProviders";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Myela TAG Gateway",
  description: "Myela TAG payment gateway operations dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[var(--color-shell)] text-slate-900 flex flex-col">
          <AppProviders>
            <Header />
            <div className="flex flex-1 min-h-[calc(100vh-var(--topbar-height))]">
              <Sidebar />
              <main className="flex-1 min-w-0 flex flex-col">{children}</main>
            </div>
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
