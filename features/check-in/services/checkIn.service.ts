import { CheckInPayload, CheckInRecord } from "../types/checkIn";

// In-memory array to simulate persistent state across submissions
let checkInStorage: CheckInRecord[] = [];

export const checkInService = {
  /**
   * Fetch all check-in records for the current user
   */
  async getCheckIns(): Promise<CheckInRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(checkInStorage);
      }, 500);
    });
  },

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

        checkInStorage.unshift(newRecord);
        resolve(newRecord);
      }, 1000);
    });
  },
};
