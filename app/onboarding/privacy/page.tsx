"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Ban, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PRIVACY_FEATURES = [
  {
    icon: Lock,
    title: "End-to-end encrypted",
    description:
      "Your journal and mood data is encrypted at rest and in transit.",
    iconBg: "bg-purple-100 text-purple-700",
  },
  {
    icon: Ban,
    title: "Never sold or shared",
    description:
      "We do not sell, rent, or share your personal data with any third party.",
    iconBg: "bg-error-light text-error",
  },
  {
    icon: Trash2,
    title: "Delete anytime",
    description:
      "Export or permanently delete all your data whenever you choose.",
    iconBg: "bg-gray-100 text-gray-600",
  },
];

export default function PrivacyPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding/features");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Privacy
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Your privacy matters
        </h1>
      </div>

      {/* 2. Privacy Feature Cards */}
      <div className="flex flex-col gap-3 py-1">
        {PRIVACY_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-xl border border-gray-200/60 bg-surface-2/50 p-4 transition-colors hover:bg-surface-2"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.iconBg}`}
              >
                <Icon className="h-5 w-5 stroke-[2]" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-sans text-heading-sm font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-body-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Actions */}
      <div className="flex flex-col pt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleNext}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          I understand
        </Button>
      </div>
    </div>
  );
}
