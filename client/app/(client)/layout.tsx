import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tulos",
    default: "Tulos",
  },
  description: "Tulos is a platform for buying and selling products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${raleway.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
