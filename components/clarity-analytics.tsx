"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityAnalytics() {
  useEffect(() => {
    clarity.init("y6e8oyrzj5");
  }, []);

  return null;
}
