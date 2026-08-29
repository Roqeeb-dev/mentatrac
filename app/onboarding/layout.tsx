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
  OnboardingBackButton,
  OnboardingLogo,
  OnboardingProgress,
} from "@/features/onboarding/components/OnboardingChrome";

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
  const Visual = step.Visual;

  return (
    <div className="min-h-screen bg-canvas md:grid md:grid-cols-2 lg:grid-cols-[45%_55%]">
      <div
        className={`relative hidden overflow-hidden bg-gradient-to-br p-10 text-white md:flex md:flex-col md:justify-between lg:p-12 ${step.gradient}`}
      >
        <OnboardingLogo inverse />

        <AnimatePresence mode="wait">
          <motion.div
            key={step.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <Visual />
            <div>
              {step.category && (
                <p className="mb-2 text-overline uppercase tracking-wide text-white/60">
                  {step.category}
                </p>
              )}
              <h2 className="font-display text-heading-xl text-white">
                {step.heading}
              </h2>
              <p className="mt-2 max-w-sm text-body-md text-white/70">
                {step.subtext}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* decorative ambient glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="flex min-h-screen flex-col">
        {/* Mobile-only compact header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 md:hidden">
          <OnboardingLogo />
          <span className="text-caption text-text-tertiary">
            {index + 1} of {total}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 md:px-10 md:py-10 lg:px-12">
          {/* Progress + back row */}
          <div className="mb-8 flex flex-col gap-3">
            <div className="hidden items-center justify-between md:flex">
              <OnboardingBackButton show={index > 0} />
              <span className="text-caption text-text-tertiary">
                {index + 1} of {total}
              </span>
            </div>
            <OnboardingProgress total={total} current={index} />
            {/* Mobile back button sits under the progress bar */}
            <div className="md:hidden">
              <OnboardingBackButton show={index > 0} />
            </div>
          </div>

          {/* Step content, centered and width-capped for readability */}
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
