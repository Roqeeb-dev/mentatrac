import type { Metadata } from "next";
import { DM_Serif_Display, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Mentatrac",
    template: "%s | Mentatrac",
  },
  description: "Track your mood and mental wellness, one check-in at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
