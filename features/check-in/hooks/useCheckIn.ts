"use client";

import { useState } from "react";
import {
  CheckInStep,
  CheckInPayload,
  MoodScore,
  EmotionCategory,
  InfluencerCategory,
  CheckInRecord,
} from "../types/checkIn";
import { checkInService } from "../services/checkIn.service";

const initialPayload: CheckInPayload = {
  mood: 3, // Default to 'Okay'
  emotions: [],
  influencers: [],
  note: "",
};

export function useCheckInFlow(onSuccess?: (record: CheckInRecord) => void) {
  const [step, setStep] = useState<CheckInStep>(1);
  const [payload, setPayload] = useState<CheckInPayload>(initialPayload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedRecord, setSavedRecord] = useState<CheckInRecord | null>(null);

  // Set selected mood (Step 1)
  const setMood = (mood: MoodScore) => {
    setPayload((prev) => ({ ...prev, mood }));
  };

  const toggleEmotion = (emotion: EmotionCategory) => {
    setPayload((prev) => {
      const exists = prev.emotions.includes(emotion);
      return {
        ...prev,
        emotions: exists
          ? prev.emotions.filter((e) => e !== emotion)
          : [...prev.emotions, emotion],
      };
    });
  };

  const toggleInfluencer = (influencer: InfluencerCategory) => {
    setPayload((prev) => {
      const exists = prev.influencers.includes(influencer);
      return {
        ...prev,
        influencers: exists
          ? prev.influencers.filter((i) => i !== influencer)
          : [...prev.influencers, influencer],
      };
    });
  };

  // Set note value (Step 4)
  const setNote = (note: string) => {
    setPayload((prev) => ({ ...prev, note }));
  };

  // Step Navigation
  const nextStep = () => {
    if (step < 4) setStep((prev) => (prev + 1) as CheckInStep);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => (prev - 1) as CheckInStep);
  };

  // Final Submit Action
  const submitCheckIn = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const record = await checkInService.submitCheckIn(payload);
      setSavedRecord(record);
      setStep(5); // Jump to Success Modal Step
      onSuccess?.(record);
    } catch (err: any) {
      setError(err?.message || "Failed to save check-in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset state for new entry
  const resetForm = () => {
    setStep(1);
    setPayload(initialPayload);
    setError(null);
    setSavedRecord(null);
  };

  return {
    step,
    payload,
    isSubmitting,
    error,
    savedRecord,
    setMood,
    toggleEmotion,
    toggleInfluencer,
    setNote,
    nextStep,
    prevStep,
    submitCheckIn,
    resetForm,
  };
}
