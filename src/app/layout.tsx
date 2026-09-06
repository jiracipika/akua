import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AKUA — Official Artist Website",
  description:
    "AKUA — official artist website. Stream AKUA on Spotify. Music, releases and the official AKUA listening experience.",
  metadataBase: new URL("https://akua.vercel.app"),
  openGraph: {
    title: "AKUA — Official Artist Website",
    description: "AKUA — official artist website. Stream AKUA on Spotify.",
    url: "https://akua.vercel.app",
    siteName: "AKUA",
    images: [{ url: "/akua-640.jpg", width: 640, height: 768, alt: "AKUA" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AKUA — Official Artist Website",
    description: "AKUA — official artist website. Stream AKUA on Spotify.",
    images: ["/akua-640.jpg"],
  },
  icons: { icon: "/icon.svg" },
  alternates: { canonical: "https://akua.vercel.app" },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${space.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
