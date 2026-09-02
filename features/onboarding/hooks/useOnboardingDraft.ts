"use client";

import { useEffect, useState } from "react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export function useOnboardingDraft() {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useOnboardingStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return {
    ...store,
    isHydrated,
  };
}
