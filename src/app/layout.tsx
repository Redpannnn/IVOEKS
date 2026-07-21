import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const josefin = Josefin_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding Of Raka & Aulia",
  description: "Selasa, 3 November 2026 - Merupakan kebahagiaan dan kehormatan bagi kami, jika Anda berkenan hadir dan memberikan restu kepada kami.",
  icons: {
    icon: "/images/wedding/floral-bouquet.png",
  },
  openGraph: {
    title: "The Wedding Of Raka & Aulia",
    description: "Selasa, 3 November 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${josefin.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}