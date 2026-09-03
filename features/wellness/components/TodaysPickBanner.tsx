"use client";

import { WellnessTip } from "../types/wellness";

interface Props {
  pick: WellnessTip;
}

export function TodaysPickBanner({ pick }: Props) {
  return (
    <div className="relative flex h-[210px] w-full overflow-hidden rounded-[24px] bg-[#635BFF] p-7 text-white shadow-sm">
      {/* Content Column */}
      <div className="relative z-10 flex flex-col justify-center max-w-[500px]">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-white backdrop-blur-md">
            TODAY'S PICK
          </span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white/90">
            • {pick.duration}
          </span>
        </div>

        {/* Category Label */}
        <span className="mt-3.5 block text-[10px] font-bold tracking-widest uppercase text-white/70">
          {pick.category}
        </span>

        {/* Title */}
        <h2 className="mt-1 font-serif text-2xl font-normal tracking-wide text-white">
          {pick.title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-white/80 font-normal">
          {pick.description}
        </p>
      </div>

      {/* Right Side Illustration Graphic */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-90 hidden sm:block">
        <svg
          width="110"
          height="90"
          viewBox="0 0 110 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Face Profile */}
          <path
            d="M20 15C20 15 32 18 36 28C40 38 35 48 30 52C26 55 24 58 26 63C28 68 35 72 35 72"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            d="M28 42C32 42 36 41 38 41"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />

          {/* Wind Swirl Lines */}
          <path
            d="M45 28H85C90 28 94 24 92 19C90 14 83 14 81 18"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            d="M48 42H95C100 42 104 46 102 51C100 56 93 56 91 52"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            d="M42 56H75C80 56 84 60 82 65C80 70 73 70 71 66"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
