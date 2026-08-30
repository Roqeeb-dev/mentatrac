"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { OnboardingStep } from "@/features/onboarding/config/steps.config";
import { OnboardingLogo } from "@/features/onboarding/components/OnboardingChrome";

export function OnboardingBrandPanel({ step }: { step: OnboardingStep }) {
  const Visual = step.Visual;

  return (
    <div
      className={`relative hidden overflow-hidden bg-gradient-to-br p-10 text-white md:flex md:flex-col md:justify-between lg:p-14 ${step.gradient}`}
    >
      {/* 1. Top Section */}
      <div className="z-10">
        <OnboardingLogo inverse />
      </div>

      {/* 2. Middle Visual Section */}
      <div className="relative z-10 flex flex-1 items-center justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.slug}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Visual />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Section: Typography (Expanded width so words don't stack) */}
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            {step.category && (
              <p className="text-overline font-semibold uppercase tracking-wider text-white/60">
                {step.category}
              </p>
            )}
            <h2 className="font-display text-display-lg font-medium leading-tight text-white">
              {step.heading}
            </h2>
            <p className="text-body-md leading-relaxed text-white/75">
              {step.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ambient Glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
    </div>
  );
}
