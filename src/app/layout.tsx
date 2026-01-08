import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.usemarqia.com"),

  title: {
    default: "Usemarqia – AI Marketing Content Generator",
    template: "%s | Usemarqia",
  },

  description:
    "Generate high-quality e-commerce and Instagram content from product images using AI. Titles, descriptions, and hashtags in seconds.",
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
  applicationName: "Usemarqia",
  authors: [{ name: "Usemarqia" }],
  generator: "Next.js",
  keywords: [
    "AI content generator",
    "image to text AI",
    "ecommerce product description",
    "instagram caption generator",
    "AI marketing tool",
    "product image AI",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.usemarqia.com",
    siteName: "Usemarqia",
    title: "Usemarqia – AI Marketing Content Generator",
    description:
      "Turn product images into high-converting e-commerce and Instagram content using AI.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Usemarqia – AI Marketing Content Generator",
    description:
      "Create e-commerce titles, descriptions, and Instagram captions from images with AI.",
  },

  alternates: {
    canonical: "https://www.usemarqia.com",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-center" richColors />
        {children}
      </body>
    </html>
  );
}
