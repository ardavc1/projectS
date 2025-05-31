import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

<link rel="icon" href="/favicon.png" type="image/png" />

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sosyalizer",
  description: "Sosyalliği ve arkadaşlığı buluşturan platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-gray-900"}>
        <Navbar />
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
