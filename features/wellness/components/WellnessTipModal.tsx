"use client";

import { X } from "lucide-react";
import { WellnessTip } from "../types/wellness";
import { CATEGORY_THEME } from "../lib/wellnessTheme";
import { WellnessCategoryIcon } from "./WellnessCategoryIcon";

interface WellnessTipModalProps {
  tip: WellnessTip | null;
  onClose: () => void;
}

export function WellnessTipModal({ tip, onClose }: WellnessTipModalProps) {
  if (!tip) return null;

  const theme = CATEGORY_THEME[tip.category];
  const isAffirmation = tip.category === "Affirmation";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[500px] bg-white rounded-t-3xl sm:rounded-3xl shadow-xl border border-slate-100 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div
          className={`relative px-6 pt-6 pb-5 ${theme.iconBg} rounded-t-3xl`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:bg-white/70 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between pr-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70">
              <WellnessCategoryIcon category={tip.category} />
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/70 text-[11px] font-semibold text-slate-600">
              {tip.duration}
            </span>
          </div>

          <p
            className={`mt-4 text-[11px] font-semibold uppercase tracking-wide ${theme.badgeText}`}
          >
            {tip.category}
            {tip.isTodaysPick && (
              <span className="ml-2 text-slate-400 font-medium normal-case">
                · Today's pick
              </span>
            )}
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">{tip.title}</h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {isAffirmation ? (
            <blockquote className="text-lg font-medium italic text-slate-800 text-center leading-relaxed px-2">
              {tip.description}
            </blockquote>
          ) : (
            <p className="text-sm text-slate-600 leading-relaxed">
              {tip.description}
            </p>
          )}

          {tip.whyItWorks && (
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Why it works
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {tip.whyItWorks}
              </p>
            </div>
          )}

          {tip.steps && tip.steps.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-3">
                How to do it
              </p>
              <ol className="space-y-3">
                {tip.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${theme.iconBg} ${theme.badgeText}`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700 leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
