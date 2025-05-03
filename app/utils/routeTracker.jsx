// components/RouteTracker.js
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Route changed:", pathname);
    const logRouteVisit = async () => {
      try {
        await fetch("/api/log-route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
      } catch (err) {
        console.error("Failed to log route:", err);
      }
    };

    logRouteVisit();
  }, [pathname]); // triggers on route change

  return null;
}
