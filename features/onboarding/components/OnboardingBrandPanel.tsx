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
      <OnboardingLogo inverse />

      <AnimatePresence mode="wait">
        <motion.div
          key={step.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col gap-10"
        >
          <Visual />

          <div className="flex flex-col gap-3">
            {step.category && (
              <p className="text-overline uppercase tracking-wide text-white/60">
                {step.category}
              </p>
            )}
            <h2 className="font-display text-display-lg leading-tight text-white">
              {step.heading}
            </h2>
            <p className="text-body-md leading-relaxed text-white/70">
              {step.subtext}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* decorative ambient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
    </div>
  );
}
