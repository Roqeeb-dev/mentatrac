"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { UserProfile } from "../types/profile";

interface Props {
  profile: UserProfile;
  onToggleNotification?: (key: string, value: boolean) => void;
  onTogglePrivacy?: (key: string, value: boolean) => void;
}

// Reusable toggle switch component
function SettingSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-[#5B46F6]" : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// Reusable Section Card Wrapper
function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100/60">
      {children}
    </div>
  );
}

export default function ProfileSettingsSection({
  profile,
  onToggleNotification,
  onTogglePrivacy,
}: Props) {
  // Local state for immediate interactive feedback
  const [notifications, setNotifications] = useState(profile.notifications);
  const [privacy, setPrivacy] = useState(profile.privacy);

  // Keep state in sync if the profile prop changes upstream
  useEffect(() => {
    setNotifications(profile.notifications);
    setPrivacy(profile.privacy);
  }, [profile]);

  const handleNotificationToggle = (
    key: keyof typeof notifications,
    value: boolean,
  ) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    onToggleNotification?.(key as string, value);
  };

  const handlePrivacyToggle = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
    onTogglePrivacy?.(key as string, value);
  };

  return (
    <div className="space-y-6">
      {/* NOTIFICATIONS */}
      <SectionCard>
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Notifications
        </h3>
        <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Daily mood reminder
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Get reminded to check in each day
              </p>
            </div>
            <SettingSwitch
              checked={notifications.dailyMoodReminder}
              onChange={(val) =>
                handleNotificationToggle("dailyMoodReminder", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Journal reminder
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Evening journaling prompt at 9 PM
              </p>
            </div>
            <SettingSwitch
              checked={notifications.journalReminder}
              onChange={(val) =>
                handleNotificationToggle("journalReminder", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Streak alerts
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Don't break the chain
              </p>
            </div>
            <SettingSwitch
              checked={notifications.streakAlerts}
              onChange={(val) => handleNotificationToggle("streakAlerts", val)}
            />
          </div>

          <div className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Reminder time
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {notifications.reminderTime || "9:00 PM"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </div>
        </div>
      </SectionCard>

      {/* PRIVACY & SECURITY */}
      <SectionCard>
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Privacy & Security
        </h3>
        <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">App lock</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Require authentication to open
              </p>
            </div>
            <SettingSwitch
              checked={privacy.appLock}
              onChange={(val) => handlePrivacyToggle("appLock", val)}
            />
          </div>

          <button className="flex w-full items-center justify-between text-left transition-colors hover:opacity-80">
            <span className="text-sm font-semibold text-slate-900">
              Privacy policy
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>

          <button className="flex w-full items-center justify-between text-left transition-colors hover:opacity-80">
            <span className="text-sm font-semibold text-slate-900">
              Terms of service
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>
        </div>
      </SectionCard>

      {/* DATA & STORAGE */}
      <SectionCard>
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Data & Storage
        </h3>
        <div className="mt-5 space-y-5">
          <button className="flex w-full items-center justify-between text-left">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Export my data
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Download everything as CSV or PDF
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>

          <button className="flex w-full items-center justify-between text-left">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                About Mentatrac
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Version 1.0.0</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>
        </div>
      </SectionCard>

      {/* ACCOUNT */}
      <SectionCard>
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Account
        </h3>
        <div className="mt-5 space-y-4">
          <button className="block w-full text-left text-sm font-semibold text-slate-900 transition-colors hover:opacity-80">
            Change password
          </button>

          <button className="block w-full text-left text-sm font-semibold text-[#5B46F6] transition-colors hover:opacity-80">
            Sign out
          </button>

          <div>
            <button className="block w-full text-left text-sm font-semibold text-rose-500 transition-colors hover:text-rose-600">
              Delete account
            </button>
            <p className="mt-0.5 text-xs text-slate-400">
              This cannot be undone
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
