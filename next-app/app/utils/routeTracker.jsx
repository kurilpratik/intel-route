// components/RouteTracker.js
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrCreateSessionId } from "./session";
import predictNextRoute from "./predictNextRoute";

let routeHistory = [];

export default function RouteTracker({ onNextRoute, onPathNameChange }) {
  const pathname = usePathname();
  const router = useRouter();
  const [nextRoute, setNextRoute] = useState(null);

  useEffect(() => {
    // Notify parent about the current pathName
    if (onPathNameChange) {
      onPathNameChange(pathname);
      // Callback so that it cab be used by the parent component (sidebar)
    }
    // Route logging to MongoDb
    console.log("Route changed:", pathname);
    const sessionId = getOrCreateSessionId();

    const logRouteVisit = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}api/log-route`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, path: pathname }),
        });
      } catch (err) {
        console.error("Failed to log route:", err);
      }
    };
    logRouteVisit();

    // Add current route to history
    if (pathname && routeHistory[routeHistory.length - 1] !== pathname) {
      routeHistory.push(pathname);
      // Keep only last 2 routes (N_GRAM - 1)
      if (routeHistory.length > 2) {
        routeHistory.shift();
      }
      // Call prediction API only when we have 2 previous routes
      if (routeHistory.length === 2) {
        predictNextRoute(routeHistory).then((nextRoute) => {
          // If nextRoute is predicted, prefetch it
          if (nextRoute) {
            // Temp solution to fix predicting the same route
            if (nextRoute === pathname) {
              console.log("Next route is the same as current route:");
              //console.log(routeHistory[routeHistory.length - 2]);
              nextRoute = routeHistory[routeHistory.length - 2];
            }

            router.prefetch(nextRoute);
            console.log("Prefetching next route:", nextRoute);
            setNextRoute(nextRoute);
            if (onNextRoute) {
              onNextRoute(nextRoute); // Making this a callback so that a client component can use a value returned by the server component
            }
          }
        });
      }
    }
  }, [pathname]); // triggers on route change

  return null;
}
