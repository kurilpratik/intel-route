"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Navbar from "@/app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "IntelRoute - Intelligent Route Prediction and Prefetching",
//   description:
//     "Intelligent Route Prediction and Prefetching using Markov Chains",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [nextRoute, setNextRoute] = useState(null);

  useEffect(() => {
    const predictNext = async () => {
      try {
        const current = pathname.replace("/", "") || "home";
        const res = await fetch(
          `http://localhost:8000/predict-next?current=${current}`
        );
        const data = await res.json();
        setNextRoute(data.next);
      } catch (err) {
        console.error("Prediction failed:", err);
      }
    };

    predictNext();
  }, [pathname]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-s`}
      >
        <Navbar />
        {children}
        {nextRoute && (
          <div
            style={{
              position: "fixed",
              bottom: 20,
              right: 20,
              padding: "10px 16px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontFamily: "sans-serif",
              fontSize: "14px",
            }}
          >
            🔮 Predicted Next Route: <strong>{nextRoute}</strong>
          </div>
        )}
      </body>
    </html>
  );
}
