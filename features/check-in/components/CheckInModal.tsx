"use client";

import { X } from "lucide-react";
import { useCheckInFlow } from "../hooks/useCheckIn";
import { StepMood } from "./StepMood";
import { StepEmotions } from "./StepEmotions";
import { StepInfluencers } from "./StepInfluencers";
import { StepNote } from "./StepNote";
import { StepSuccess } from "./StepSuccess";

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const {
    step,
    payload,
    isSubmitting,
    savedRecord,
    setMood,
    toggleEmotion,
    toggleInfluencer,
    setNote,
    nextStep,
    prevStep,
    submitCheckIn,
    resetForm,
  } = useCheckInFlow();

  if (!isOpen) return null;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 md:p-8 shadow-2xl transition-all">
        {/* Top Header & Progress Segment Bars */}
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  step >= i ? "w-6 bg-violet-600" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Step Renderer */}
        {step === 1 && (
          <StepMood
            selectedMood={payload.mood}
            onSelectMood={setMood}
            onContinue={nextStep}
          />
        )}

        {step === 2 && (
          <StepEmotions
            selectedEmotions={payload.emotions}
            onToggleEmotion={toggleEmotion}
            onBack={prevStep}
            onContinue={nextStep}
          />
        )}

        {step === 3 && (
          <StepInfluencers
            selectedInfluencers={payload.influencers}
            onToggleInfluencer={toggleInfluencer}
            onBack={prevStep}
            onContinue={nextStep}
          />
        )}

        {step === 4 && (
          <StepNote
            note={payload.note || ""}
            onNoteChange={setNote}
            onBack={prevStep}
            onSubmit={submitCheckIn}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 5 && (
          <StepSuccess record={savedRecord} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}
