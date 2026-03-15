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

const siteUrl = "https://shyamsaiteja.vercel.app";

export const metadata: Metadata = {
  title: "Shyam Sai Teja | Software Engineer & Designer",
  description:
    "Software engineer at IIT Madras passionate about building beautiful, functional products. Specializing in full-stack development, AI/ML, and design engineering.",
  keywords: [
    "Shyam Sai Teja",
    "Software Engineer",
    "Web Developer",
    "Portfolio",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Design Engineer",
    "React Native",
  ],
  authors: [{ name: "Shyam Sai Teja", url: siteUrl }],
  creator: "Shyam Sai Teja",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shyam Sai Teja",
    title: "Shyam Sai Teja — Software Engineer & Designer",
    description:
      "Software engineer passionate about building beautiful, functional products across web, mobile, and AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shyam Sai Teja — Software Engineer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyam Sai Teja — Software Engineer & Designer",
    description:
      "Software engineer passionate about building beautiful, functional products across web, mobile, and AI.",
    images: ["/og-image.png"],
    creator: "@Shyamsaitej",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "theme-color": "#0a0a0b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shyam Sai Teja",
    url: siteUrl,
    jobTitle: "Software Engineer & Designer",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "IIT Madras",
    },
    sameAs: [
      "https://github.com/Shyamsaitejamandibi",
      "https://www.linkedin.com/in/shyam-sai-teja-235054253",
      "https://x.com/Shyamsaitej",
      "https://peerlist.io/shyamsaiteja",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
