"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  ONBOARDING_STEPS,
  getStepBySlug,
  getStepIndex,
} from "@/features/onboarding/config/steps.config";
import {
  OnboardingHeader,
  OnboardingLogo,
} from "@/features/onboarding/components/OnboardingChrome";
import { OnboardingBrandPanel } from "@/features/onboarding/components/OnboardingBrandPanel";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() ?? "welcome";
  const step = getStepBySlug(slug);
  const index = getStepIndex(slug);
  const total = ONBOARDING_STEPS.length;

  return (
    <div className="min-h-screen bg-canvas md:grid md:grid-cols-2 lg:grid-cols-[45%_55%]">
      <OnboardingBrandPanel step={step} />

      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4 md:hidden">
          <OnboardingLogo />
        </div>

        <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 md:px-12 md:py-10">
          <div className="mb-10 w-full">
            <OnboardingHeader
              total={total}
              current={index}
              showBack={index > 0}
            />
          </div>

          {/* Form Content Area */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
