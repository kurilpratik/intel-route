import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/Navbar";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Intel Route - Intelligent Route Prediction and Prefetching",
  description:
    "Intelligent Route Prediction and Prefetching using Machine Learning Model",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-s`}
      >
        <Sidebar className="w-[40%]" />
        {/* <RouteTracker /> */}
        <div className="w-[60%] pl-[20%]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
