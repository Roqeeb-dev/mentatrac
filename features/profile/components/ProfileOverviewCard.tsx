import Image from "next/image";
import { UserProfile } from "../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileOverviewCard({ profile }: Props) {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-6 rounded-[24px] border border-slate-100 bg-[#F4FAF8]/60 p-6 shadow-sm backdrop-blur-sm">
      {/* Bio Header */}
      <div className="flex flex-col items-center pt-2 text-center">
        {profile.avatarUrl ? (
          <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-md ring-4 ring-white">
            <Image
              src={profile.avatarUrl}
              alt={profile.fullName}
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#635BFF] text-2xl font-bold text-white shadow-md ring-4 ring-white">
            {getInitial(profile.fullName)}
          </div>
        )}
        <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-slate-900">
          {profile.fullName}
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">{profile.email}</p>
        {profile.memberSince && (
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Member since {profile.memberSince}
          </p>
        )}
      </div>

      {/* Wellness Score Card */}
      <div className="relative overflow-hidden rounded-[20px] bg-[#635BFF] p-5 text-white shadow-lg shadow-indigo-200/50">
        <span className="text-[10px] font-bold tracking-wider uppercase text-white/80">
          Wellness Score
        </span>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight">
            {profile.wellnessScore}
          </span>
          <span className="text-sm font-medium text-white/70">/100</span>
        </div>
        <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all duration-500 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, profile.wellnessScore))}%`,
            }}
          />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-indigo-100/90">
          22 positive days this month. Keep building on this momentum.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-white p-3.5 text-center shadow-xs border border-slate-100/80">
          <span className="text-xl font-bold text-[#635BFF]">
            {profile.totalCheckIns}
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Check-ins
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-3.5 text-center shadow-xs border border-slate-100/80">
          <span className="text-xl font-bold text-[#00D084]">
            {profile.totalJournalEntries}
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Journal
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-white p-3.5 text-center shadow-xs border border-slate-100/80">
          <span className="text-xl font-bold text-[#FF9F43]">
            {profile.currentStreakDays}{" "}
            <span className="text-sm inline-block translate-y-[-1px]">🔥</span>
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Streak
          </span>
        </div>
      </div>

      {/* Mood Breakdown */}
      <div className="pt-1">
        <h3 className="text-xs font-bold text-slate-900">Mood breakdown</h3>
        <div className="mt-3.5 space-y-3">
          {profile.moodBreakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <span className="w-5 text-center text-sm leading-none">
                {item.moodLabel}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: item.colorHex,
                    width: `${Math.min(100, (item.count / 20) * 100)}%`,
                  }}
                />
              </div>
              <span className="w-4 text-right text-[11px] font-medium text-slate-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
