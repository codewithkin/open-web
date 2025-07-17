import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/custom/TopBar";
import QueryClientProviderWrapper from "@/providers/QueryClientProviderWrapper";
import WelcomeDialog from "@/components/custom/WelcomeDialog";
import { Toaster } from "sonner";
import 'react-virtualized/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open – Anonymous Confessions for Gen Z",
  description:
    "Open is a safe space to speak your truth anonymously. Share thoughts, secrets, and feelings without judgment — text or voice, no accounts, no filters.",
  keywords: [
    "anonymous app",
    "confessions",
    "Gen Z",
    "share secrets",
    "mental health",
    "safe space",
    "voice confessions",
    "open app",
    "anonymous voice notes",
    "emotional support",
  ],
  openGraph: {
    title: "Open – Anonymous Confessions for Gen Z",
    description:
      "A space to be real. Share confessions anonymously — text or voice — with no sign-ups or tracking.",
    url: "https://openconfess.buzz",
    siteName: "Open",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open App – Anonymous Confessions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open – Anonymous Confessions for Gen Z",
    description:
      "A safe space to share your truth anonymously. No accounts. No filters. Just honesty.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://openconfess.buzz"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6071419245494198"
      crossOrigin="anonymous">
      </script>
      <meta name="google-adsense-account" content="ca-pub-6071419245494198"></meta>
        <meta name="apple-mobile-web-app-title" content="OpenConfess" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased dark:bg-[#10231E] dark:text-white`}
      >
        <QueryClientProviderWrapper>
          <TopBar />
          {children}
          <WelcomeDialog />
          <Toaster richColors expand />
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}

