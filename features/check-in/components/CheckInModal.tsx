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

  const steps = [
    <StepMood
      key={1}
      selectedMood={payload.mood}
      onSelectMood={setMood}
      onContinue={nextStep}
    />,
    <StepEmotions
      key={2}
      selectedEmotions={payload.emotions}
      onToggleEmotion={toggleEmotion}
      onBack={prevStep}
      onContinue={nextStep}
    />,
    <StepInfluencers
      key={3}
      selectedInfluencers={payload.influencers}
      onToggleInfluencer={toggleInfluencer}
      onBack={prevStep}
      onContinue={nextStep}
    />,
    <StepNote
      key={4}
      note={payload.note || ""}
      onNoteChange={setNote}
      onBack={prevStep}
      onSubmit={submitCheckIn}
      isSubmitting={isSubmitting}
    />,
    <StepSuccess key={5} record={savedRecord} onClose={handleClose} />,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-gray-100 p-6 md:p-8 shadow-2xl transition-all">
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

        {steps[step - 1]}
      </div>
    </div>
  );
}
