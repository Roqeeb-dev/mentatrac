"use client";

import { motion } from "framer-motion";
import {
  Lock,
  BarChart3,
  BookOpen,
  Sparkles,
  Bell,
  Target,
  UserRound,
  ShieldCheck,
  PartyPopper,
} from "lucide-react";
import type { ReactNode } from "react";

export type OnboardingStep = {
  /** matches the folder name under app/onboarding/ */
  slug: string;
  category?: string;
  heading: string;
  subtext: string;
  /** Tailwind gradient classes for the left panel */
  gradient: string;
  Visual: () => ReactNode;
};

const floatY = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" as const },
};

/* ------------------------------- Visuals -------------------------------- */

function MoodRowVisual() {
  const moods = [
    { emoji: "✨", bg: "bg-mood-radiant-light" },
    { emoji: "🙂", bg: "bg-mood-good-light" },
    { emoji: "😐", bg: "bg-mood-okay-light" },
    { emoji: "😔", bg: "bg-mood-tough-light" },
    { emoji: "😢", bg: "bg-mood-hard-light" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((m, i) => (
        <motion.div
          key={m.emoji}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${m.bg} text-xl`}
          animate={floatY.animate}
          transition={{ ...floatY.transition, delay: i * 0.12 }}
        >
          {m.emoji}
        </motion.div>
      ))}
    </div>
  );
}

function LockVisual() {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur"
      animate={floatY.animate}
      transition={floatY.transition}
    >
      <Lock className="h-7 w-7 text-white" strokeWidth={1.75} />
    </motion.div>
  );
}

function FeatureListVisual() {
  const items = [
    { icon: BarChart3, label: "Mood analytics", sub: "Spot trends over days, weeks, months" },
    { icon: BookOpen, label: "Private journal", sub: "Your thoughts, beautifully kept" },
    { icon: Sparkles, label: "Wellness tips", sub: "Personalised to how you feel" },
  ];
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <item.icon className="h-5 w-5 shrink-0 text-white" strokeWidth={1.75} />
          <div>
            <p className="text-body-sm font-semibold text-white">{item.label}</p>
            <p className="text-caption text-white/60">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatsGridVisual() {
  const stats = [
    { value: "10k+", label: "Active users" },
    { value: "98%", label: "Privacy rating" },
    { value: "4.9★", label: "User rating" },
    { value: "30 days", label: "Free trial" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="rounded-xl bg-white/10 p-4 backdrop-blur"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
        >
          <p className="text-heading-sm font-semibold text-white">{s.value}</p>
          <p className="text-caption text-white/60">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

function AvatarVisual() {
  return (
    <motion.div
      className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur"
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <UserRound className="h-9 w-9 text-white/80" strokeWidth={1.5} />
    </motion.div>
  );
}

function TargetVisual() {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur text-3xl"
      animate={{ rotate: [0, -6, 6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Target className="h-8 w-8 text-white" strokeWidth={1.5} />
    </motion.div>
  );
}

function BellVisual() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur"
        animate={{ rotate: [0, -12, 12, -8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.4 }}
      >
        <Bell className="h-7 w-7 text-mood-radiant" strokeWidth={1.75} />
      </motion.div>
      <motion.div
        className="w-56 rounded-xl bg-white/95 p-3 text-left shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <p className="text-caption font-semibold text-text-primary">
          Mentatrac · now
        </p>
        <p className="text-body-sm font-semibold text-text-primary">
          How are you feeling today?
        </p>
        <p className="text-caption text-text-tertiary">
          Your 9:00 PM check-in is ready
        </p>
      </motion.div>
    </div>
  );
}

function CelebrationVisual() {
  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.div
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <PartyPopper className="h-7 w-7 text-mood-radiant" strokeWidth={1.75} />
      </motion.div>
      <motion.div
        className="w-56 rounded-xl bg-white/10 p-4 backdrop-blur"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <p className="text-heading-sm font-semibold text-white">30</p>
        <p className="text-caption text-white/60">check-ins waiting for you</p>
      </motion.div>
      <motion.div
        className="w-56 rounded-xl bg-white/10 p-4 backdrop-blur"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-body-sm italic text-white/80">
          "You don't have to be okay to feel sad, angry..."
        </p>
        <p className="mt-1 text-caption text-white/50">— Lori Deschene</p>
      </motion.div>
    </div>
  );
}

/* -------------------------------- Steps ---------------------------------- */

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    slug: "welcome",
    heading: "Your wellness, visualised.",
    subtext:
      "Track how you feel every day and discover the patterns that shape your wellbeing.",
    gradient: "from-purple-900 via-purple-700 to-purple-500",
    Visual: MoodRowVisual,
  },
  {
    slug: "privacy",
    category: "Privacy",
    heading: "Your data. Only yours.",
    subtext: "Everything you share stays private. No selling, no sharing, no exceptions.",
    gradient: "from-purple-900 via-purple-700 to-info",
    Visual: LockVisual,
  },
  {
    slug: "features",
    category: "Features",
    heading: "Built for how you actually feel.",
    subtext: "Simple daily check-ins, a private journal, and insights that help you grow.",
    gradient: "from-purple-900 via-purple-700 to-purple-500",
    Visual: FeatureListVisual,
  },
  {
    slug: "create-account",
    category: "Create account",
    heading: "Join thousands feeling better.",
    subtext: "Create your free account and start understanding your emotions today.",
    gradient: "from-purple-900 via-green-700 to-green-500",
    Visual: StatsGridVisual,
  },
  {
    slug: "profile",
    category: "Your profile",
    heading: "Make it yours.",
    subtext: "Your profile stays completely private — only you can see it.",
    gradient: "from-purple-900 via-info to-green-700",
    Visual: AvatarVisual,
  },
  {
    slug: "goals",
    category: "Your goals",
    heading: "What matters to you?",
    subtext: "Your goals help us surface the right tips and insights for your journey.",
    gradient: "from-purple-900 via-info to-green-700",
    Visual: TargetVisual,
  },
  {
    slug: "reminders",
    category: "Reminders",
    heading: "Stay on track.",
    subtext: "A gentle daily nudge keeps the habit alive. You control the timing.",
    gradient: "from-purple-900 to-green-700",
    Visual: BellVisual,
  },
  {
    slug: "ready",
    category: "You're all set",
    heading: "Ready when you are.",
    subtext: "Your first check-in is just a tap away — let's get started.",
    gradient: "from-green-700 via-purple-700 to-purple-900",
    Visual: CelebrationVisual,
  },
];

export function getStepBySlug(slug: string) {
  return ONBOARDING_STEPS.find((s) => s.slug === slug) ?? ONBOARDING_STEPS[0];
}

export function getStepIndex(slug: string) {
  const i = ONBOARDING_STEPS.findIndex((s) => s.slug === slug);
  return i === -1 ? 0 : i;
}