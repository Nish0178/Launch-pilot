"use client";

import { useEffect } from "react";
import { app, analytics } from "@/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    // Analytics is automatically initialized in lib/firebase.ts 
    // when the client loads. This component just ensures the file
    // is imported and runs on the client side.
  }, []);

  return null;
}
