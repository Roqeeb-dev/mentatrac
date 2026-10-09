"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { OnboardingStep } from "@/features/onboarding/config/steps.config";
import { OnboardingLogo } from "@/features/onboarding/components/OnboardingChrome";

export function OnboardingBrandPanel({ step }: { step: OnboardingStep }) {
  const Visual = step.Visual;

  return (
    <div
      className="relative hidden overflow-hidden px-10 py-10 text-white md:flex md:min-h-screen md:flex-col md:justify-between lg:px-14 lg:py-12"
      style={{
        background:
          "linear-gradient(160deg, #262A6B 0%, #1E2E5A 48%, #122A2B 100%)",
      }}
    >
      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 85%)",
          }}
        />
        <div className="absolute -right-28 -top-28 h-[384px] w-[384px] rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-[384px] w-[384px] rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[288px] w-[288px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-indigo-400/10 blur-3xl" />
      </div>

      {/* 1. Logo */}
      <div className="relative z-10 shrink-0">
        <OnboardingLogo inverse />
      </div>

      {/* 2. Visual */}
      <div className="relative z-10 flex min-h-[300px] flex-1 items-center justify-center py-8">
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

      {/* 3. Text: fixed max width, shrinks on smaller panels */}
      <div className="relative z-10 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-[440px] max-w-full flex-col gap-3"
          >
            {step.category && (
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-overline font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                {step.category}
              </p>
            )}
            <h2 className="font-display text-display-lg font-medium leading-tight text-white">
              {step.heading}
            </h2>
            <p className="w-[400px] max-w-full text-body-md leading-relaxed text-white/70">
              {step.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
