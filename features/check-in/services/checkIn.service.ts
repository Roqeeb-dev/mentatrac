import { CheckInPayload, CheckInRecord } from "../types/checkIn";

export const checkInService = {
  /**
   * Submit check-in payload to backend API (simulated network latency)
   */
  async submitCheckIn(payload: CheckInPayload): Promise<CheckInRecord> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!payload.mood) {
          reject(new Error("Mood selection is required to submit a check-in."));
          return;
        }

        const newRecord: CheckInRecord = {
          id: `chk_${Date.now()}`,
          ...payload,
          createdAt: new Date().toISOString(),
        };

        resolve(newRecord);
      }, 1000);
    });
  },
};
