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
import { useQueryClient } from "@tanstack/react-query";
import { CHECK_INS_QUERY_KEY } from "./useCheckInHistory";
import { profileKeys } from "@/features/profile/hooks/useUserProfile";
import { toast } from "@/stores/toast-store";
import { getErrorMessage } from "@/lib/api/getErrorMessage";

const initialPayload: CheckInPayload = {
  mood: 3,
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
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: CHECK_INS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
      setSavedRecord(record);
      setStep(5);
      toast.success("Check-in saved");
      onSuccess?.(record);
    } catch (err) {
      const message = getErrorMessage(err, {
        fallback: "Couldn't save your check-in. Please try again.",
        400: "We couldn't save that check-in. Please review your selections and try again.",
      });
      setError(message);
      toast.error(message);
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
