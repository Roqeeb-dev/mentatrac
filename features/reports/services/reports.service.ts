import { mockReportsData } from "../data/reportsData";
import { ReportsData, TimeRange } from "../types/reports";

export const reportsService = {
  async getReportsData(timeRange: TimeRange = "30D"): Promise<ReportsData> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return mockReportsData[timeRange] || mockReportsData["30D"];
  },
};