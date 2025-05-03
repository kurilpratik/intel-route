// components/RouteTracker.js
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getOrCreateSessionId } from "./session";

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Route changed:", pathname);
    const sessionId = getOrCreateSessionId();
    const logRouteVisit = async () => {
      try {
        await fetch("/api/log-route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, path: pathname }),
        });
      } catch (err) {
        console.error("Failed to log route:", err);
      }
    };

    logRouteVisit();
  }, [pathname]); // triggers on route change

  return null;
}
