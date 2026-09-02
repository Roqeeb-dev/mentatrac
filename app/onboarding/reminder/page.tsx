"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

export default function ReminderPage() {
  const router = useRouter();

  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState("21:00");

  const handleNext = () => {
    // Process reminder configuration state
    router.push("/onboarding/complete"); // Route to Step 8
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-2">
        <p className="text-overline font-semibold uppercase tracking-wider text-text-tertiary">
          Reminders
        </p>
        <h1 className="font-display text-display-lg font-bold text-text-primary">
          Stay consistent
        </h1>
      </div>

      {/* 2. Switch Toggle */}
      <Switch
        checked={reminderEnabled}
        onCheckedChange={setReminderEnabled}
        label="Daily mood reminder"
        description="A gentle nudge to check in each day"
      />

      {/* 3. Time Picker Input */}
      {reminderEnabled && (
        <div className="flex flex-col gap-1.5 transition-all">
          <Input
            label="Reminder time"
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
      )}

      {/* 4. Actions */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleNext}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {reminderEnabled ? `Set reminder for ${reminderTime}` : "Continue"}
        </Button>

        <Link
          href="/onboarding/complete"
          className="text-center text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          Skip for now
        </Link>
      </div>
    </div>
  );
}
