import Navbar from "@/components/reusable/Navbar";
import "./globals.css";
import { ibm_flex_mono } from "@/utils/fonts.config";
import Footer from "@/components/reusable/Footer";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "Revmerch International",
  description: "Elevate Your Style with our High Quality Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibm_flex_mono.className}>
        <NextTopLoader color="#e32d2d" showSpinner={false} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
