import Navbar from "@/components/reusable/Navbar";
import "./globals.css";
import { ibm_flex_mono } from "@/utils/fonts.config";

export const metadata = {
  title: "Revmerch International",
  description: "Elevate Your Style with our High Quality Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibm_flex_mono.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}