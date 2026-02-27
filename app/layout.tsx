import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/components/ModalProvider";
import ToasterProvider from "@/components/ToasterProvider";
import CrispChatProvider from "@/components/CrispChatProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" >
        <body className={inter.className}>
          <CrispChatProvider />
          <ModalProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
