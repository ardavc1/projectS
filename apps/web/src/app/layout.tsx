import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // İstediğin kalınlıkları burada belirleyebilirsin
});

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
      <head>
        <link rel="icon" href="/justS.png" type="image/png" />
        <title>Sosyalizer</title>
        <meta name="description" content="Sosyalliği ve arkadaşlığı buluşturan platform" />
      </head>
      <body className={montserrat.className + " bg-white text-gray-900"}>
        <Navbar />
        <main className="p-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
