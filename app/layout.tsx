import GlobalContextProvider from "@/Context";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Snippetarium",
  description: "Organize Your Code Snippets Efficiently!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <GlobalContextProvider>
          <body className={poppins.className}>{children}</body>
        </GlobalContextProvider>
      </ClerkProvider>
    </html>
  );
}
