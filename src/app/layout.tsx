import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Decision Maker",
  description: "Ask a yes or no question and get an instant answer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}