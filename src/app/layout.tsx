import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open – Your Creative Workspace for Projects, Collaboration, and Growth",
  description:
    "Open is a modern web platform that empowers individuals and teams to collaborate, create, and manage projects with complete transparency and real-time updates. Built for freelancers, agencies, and clients.",
  keywords: [
    "Open workspace",
    "Freelance project platform",
    "Team collaboration tool",
    "Real-time project updates",
    "Client management",
    "ProjectPulse alternative",
    "Freliq integration",
  ],
  openGraph: {
    title: "Open – Your Creative Workspace",
    description:
      "A platform where freelancers and clients connect transparently. Track progress, share updates, and grow together.",
    url: "https://open.yourdomain.com",
    siteName: "Open",
    images: [
      {
        url: "https://open.yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open – Your Creative Workspace",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open – Your Creative Workspace",
    description:
      "Empowering creators and clients to collaborate, track, and grow transparently.",
    images: ["https://open.yourdomain.com/twitter-card.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="OpenConfess" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
