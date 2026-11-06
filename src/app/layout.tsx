import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MABZUL® | Only What’s Worth Sharing",
  description: "Curated dates, nuts and chocolates for everyday indulgence and meaningful gifting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans bg-[#FAF7F5] text-[#550818] min-h-screen selection:bg-[#550818] selection:text-[#FAF7F5]">
        {children}
      </body>
    </html>
  );
}
