import { ChevronRight } from "lucide-react";
import { UserProfile } from "../types/profile";
import { Switch } from "@/components/ui/Switch";

interface Props {
  profile: UserProfile;
  onToggleNotification?: (key: string, value: boolean) => void;
  onTogglePrivacy?: (key: string, value: boolean) => void;
}

export default function ProfileSettingsSection({
  profile,
  onToggleNotification,
  onTogglePrivacy,
}: Props) {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm divide-y divide-slate-100">
      {/* NOTIFICATIONS */}
      <section className="pb-6">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Notifications
        </h3>
        <div className="mt-4 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Daily mood reminder
              </p>
              <p className="text-xs text-slate-400">
                Get reminded to check in each day
              </p>
            </div>
            <Switch
              checked={profile.notifications.dailyMoodReminder}
              onCheckedChange={(val) =>
                onToggleNotification?.("dailyMoodReminder", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Journal reminder
              </p>
              <p className="text-xs text-slate-400">
                Evening journaling prompt at 9 PM
              </p>
            </div>
            <Switch
              checked={profile.notifications.journalReminder}
              onCheckedChange={(val) =>
                onToggleNotification?.("journalReminder", val)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Streak alerts
              </p>
              <p className="text-xs text-slate-400">Don't break the chain</p>
            </div>
            <Switch
              checked={profile.notifications.streakAlerts}
              onCheckedChange={(val) =>
                onToggleNotification?.("streakAlerts", val)
              }
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Reminder time
              </p>
              <p className="text-xs text-slate-400">
                {profile.notifications.reminderTime || "9:00 PM"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 cursor-pointer" />
          </div>
        </div>
      </section>

      {/* PRIVACY & SECURITY */}
      <section className="py-6">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Privacy & Security
        </h3>
        <div className="mt-4 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">App lock</p>
              <p className="text-xs text-slate-400">
                Require authentication to open
              </p>
            </div>
            <Switch
              checked={profile.privacy.appLock}
              onCheckedChange={(val) => onTogglePrivacy?.("appLock", val)}
            />
          </div>

          <button className="flex w-full items-center justify-between text-left transition-colors hover:text-indigo-600">
            <span className="text-sm font-semibold text-slate-800">
              Privacy policy
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>

          <button className="flex w-full items-center justify-between text-left transition-colors hover:text-indigo-600">
            <span className="text-sm font-semibold text-slate-800">
              Terms of service
            </span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>
        </div>
      </section>

      {/* DATA & STORAGE */}
      <section className="py-6">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Data & Storage
        </h3>
        <div className="mt-4 space-y-5">
          <button className="flex w-full items-center justify-between text-left">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Export my data
              </p>
              <p className="text-xs text-slate-400">
                Download everything as CSV or PDF
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>

          <button className="flex w-full items-center justify-between text-left">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                About Mentatrac
              </p>
              <p className="text-xs text-slate-400">Version 1.0.0</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </button>
        </div>
      </section>

      {/* ACCOUNT */}
      <section className="pt-6">
        <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Account
        </h3>
        <div className="mt-4 space-y-4">
          <button className="block w-full text-left text-sm font-semibold text-slate-800 transition-colors hover:text-indigo-600">
            Change password
          </button>

          <button className="block w-full text-left text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
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
      </section>
    </div>
  );
}
