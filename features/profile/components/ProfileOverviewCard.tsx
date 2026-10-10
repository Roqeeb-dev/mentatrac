import Image from "next/image";
import { UserProfile } from "../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileOverviewCard({ profile }: Props) {
  const getInitial = (name?: string | null) =>
    (name?.trim().charAt(0) || "U").toUpperCase();

  const maxMoodCount = Math.max(
    1,
    ...profile.moodBreakdown.map((m) => m.count),
  );
  const scoreWidth = Math.min(100, Math.max(0, profile.wellnessScore));

  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-slate-100 bg-[#F4FAF8]/60 p-4 shadow-sm backdrop-blur-sm sm:gap-6 sm:p-6">
      {/* Bio Header: side by side on phones, centered stack from sm up */}
      <div className="flex items-center gap-4 text-left sm:flex-col sm:gap-0 sm:pt-2 sm:text-center">
        {profile.avatarUrl ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-md ring-4 ring-white sm:h-20 sm:w-20">
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
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#635BFF] text-xl font-bold text-white shadow-md ring-4 ring-white sm:h-20 sm:w-20 sm:text-2xl">
            {getInitial(profile.fullName)}
          </div>
        )}

        <div className="min-w-0 flex-1 sm:flex-none">
          <h2 className="truncate font-serif text-xl font-bold tracking-tight text-slate-900 sm:mt-4 sm:text-2xl">
            {profile.fullName}
          </h2>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {profile.email}
          </p>
          {profile.memberSince && (
            <p className="mt-0.5 text-[11px] font-medium text-slate-400 sm:mt-1">
              Member since {profile.memberSince}
            </p>
          )}
        </div>
      </div>

      {/* Wellness Score Card: score and message side by side on phones */}
      <div className="relative overflow-hidden rounded-[20px] bg-[#635BFF] p-4 text-white shadow-lg shadow-indigo-200/50 sm:p-5">
        <div className="flex items-center justify-between gap-4 sm:block">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Wellness Score
            </span>
            <div className="mt-1 flex items-baseline gap-1 sm:mt-1.5">
              <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {profile.wellnessScore}
              </span>
              <span className="text-sm font-medium text-white/70">/100</span>
            </div>
          </div>

          <p className="max-w-[160px] text-right text-[11px] leading-snug text-indigo-100/90 sm:hidden">
            {profile.positiveDaysThisMonth} positive days this month
          </p>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25 sm:mt-3.5">
          <div
            className="h-full rounded-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${scoreWidth}%` }}
          />
        </div>

        <p className="mt-3 hidden text-[11px] leading-relaxed text-indigo-100/90 sm:block">
          {profile.positiveDaysThisMonth} positive days this month. Keep
          building on this momentum.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <div className="flex flex-col items-center rounded-2xl border border-slate-100/80 bg-white p-3 text-center shadow-xs sm:p-3.5">
          <span className="text-xl font-bold text-[#635BFF]">
            {profile.totalCheckIns}
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Check-ins
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl border border-slate-100/80 bg-white p-3 text-center shadow-xs sm:p-3.5">
          <span className="text-xl font-bold text-[#00D084]">
            {profile.totalJournalEntries}
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Journal
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl border border-slate-100/80 bg-white p-3 text-center shadow-xs sm:p-3.5">
          <span className="text-xl font-bold text-[#FF9F43]">
            {profile.currentStreakDays}{" "}
            <span className="inline-block translate-y-[-1px] text-sm">🔥</span>
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            Streak
          </span>
        </div>
      </div>

      {/* Mood Breakdown */}
      <div className="pt-1">
        <h3 className="text-xs font-bold text-slate-900">Mood breakdown</h3>

        {/* Phones: compact row of emoji with counts */}
        <div className="mt-3 grid grid-cols-5 gap-2 sm:hidden">
          {profile.moodBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 rounded-xl bg-white py-2 shadow-xs"
            >
              <span className="text-lg leading-none">{item.moodLabel}</span>
              <span
                className="text-xs font-bold"
                style={{ color: item.count > 0 ? item.colorHex : "#CBD5E1" }}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3.5 hidden space-y-3 sm:block">
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
                    width: `${(item.count / maxMoodCount) * 100}%`,
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
