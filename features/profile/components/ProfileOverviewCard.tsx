import { UserProfile } from "../types/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileOverviewCard({ profile }: Props) {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Bio Header */}
      <div className="flex flex-col items-center text-center pt-2">
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white shadow-inner">
            {getInitial(profile.fullName)}
          </div>
        )}
        <h2 className="mt-4 text-xl font-bold text-slate-900">
          {profile.fullName}
        </h2>
        <p className="text-xs text-slate-500">{profile.email}</p>
        {profile.memberSince && (
          <p className="mt-1 text-[11px] text-slate-400">
            Member since {profile.memberSince}
          </p>
        )}
      </div>

      {/* Wellness Score Card */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 p-5 text-white shadow-md">
        <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
          Wellness Score
        </span>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold tracking-tight">
            {profile.wellnessScore}
          </span>
          <span className="text-sm font-medium opacity-80">/100</span>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, profile.wellnessScore))}%`,
            }}
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-indigo-100/90">
          22 positive days this month. Keep building on this momentum.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="flex flex-col items-center rounded-xl bg-slate-50/80 p-3 text-center border border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            {profile.totalCheckIns}
          </span>
          <span className="text-[11px] text-slate-500">Check-ins</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-slate-50/80 p-3 text-center border border-slate-100">
          <span className="text-lg font-bold text-indigo-600">
            {profile.totalJournalEntries}
          </span>
          <span className="text-[11px] text-slate-500">Journal</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-slate-50/80 p-3 text-center border border-slate-100">
          <span className="text-lg font-bold text-amber-500">
            {profile.currentStreakDays} 🔥
          </span>
          <span className="text-[11px] text-slate-500">Streak</span>
        </div>
      </div>

      {/* Mood Breakdown */}
      <div className="pt-2">
        <h3 className="text-xs font-bold text-slate-900">Mood breakdown</h3>
        <div className="mt-3.5 space-y-3">
          {profile.moodBreakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <span className="w-4 text-center">{item.moodLabel}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: item.colorHex,
                    width: `${Math.min(100, (item.count / 20) * 100)}%`,
                  }}
                />
              </div>
              <span className="w-4 text-right font-medium text-slate-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
