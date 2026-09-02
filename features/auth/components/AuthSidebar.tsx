import { Sparkles } from "lucide-react";

const STATS = [
  { value: "30", label: "check-ins" },
  { value: "12", label: "day streak" },
  { value: "6", label: "journals" },
];

export function AuthSidebar() {
  return (
    <aside className="relative flex h-full min-h-screen w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1C1B36] via-[#1E2548] to-[#122A26] p-10">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-purple-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

      {/* Brand Logo Header */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
          <Sparkles className="h-5 w-5 text-amber-300" />
        </div>
        <span className="font-display text-heading-md font-bold text-white">
          Mentatrac
        </span>
      </div>

      {/* Central Graphic & Stats */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-12">
        {/* Orbital Brain Graphic */}
        <div className="relative flex h-64 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* Central Brain Node */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-400/80 to-purple-600/80 p-0.5 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#251E40]">
              <span className="text-3xl">🧠</span>
            </div>
          </div>

          {/* Orbital Badges */}
          <div className="absolute top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-md">
            🌧️
          </div>
          <div className="absolute right-2 top-1/3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-md">
            ✨
          </div>
          <div className="absolute bottom-6 right-8 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-md">
            🌤️
          </div>
          <div className="absolute bottom-6 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-md">
            📝
          </div>
          <div className="absolute left-2 top-1/3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs backdrop-blur-md">
            🌧️
          </div>
        </div>

        <div className="mt-8 flex items-center gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-display-lg font-bold text-white">
                {stat.value}
              </span>
              <span className="text-caption font-medium text-white/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[320px]">
        <p className="text-body-sm leading-relaxed text-white/80">
          &ldquo;You don&apos;t have to be positive all the time. It&apos;s
          perfectly okay to feel sad, angry, annoyed, or overwhelmed.&rdquo;
        </p>
        <span className="mt-2 block text-caption text-white/50">
          — Lori Deschene
        </span>
      </div>
    </aside>
  );
}
