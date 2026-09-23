import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Inter is the product's typeface. The case study at `/` loads its own two
 * faces on its own wrapper, so nothing it needs reaches the prototype.
 *
 * Inter only. Montserrat is Alivo's marketing face and does not enter the
 * product — the logo wordmark is not Montserrat either, so setting "Alivo"
 * in it would be less brand-accurate, not more. (typography §2)
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alivo Mission Control",
  description: "Human supervision for AI-powered home service operations.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
