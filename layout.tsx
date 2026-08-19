import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Care - Your Campus Wellness Platform",
  description:
    "Access wellness resources, report issues, book counseling, and stay connected with campus care services.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
