import { api_host } from "@/const/host";
import { DocSpeedInsight, SpeedInsight } from "@/types/speed-insights";
import { authorizationHeader } from "..";
const prefix = `${api_host}/speed-insights`;
export const speed_insights = {
  getAll: async (appId: string): Promise<DocSpeedInsight[]> => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      const url = `${prefix}/metric/all?appId=${appId}`;
      const res = await fetch(url, { method: "GET", headers: headers });
      if (res.ok) return await res.json();
      return [];
    } catch (e) {
      return [];
    }
  },
  getRange: async (
    appId: string,
    start: number,
    end: number
  ): Promise<DocSpeedInsight[]> => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      const url = `${prefix}/metric/range?appId=${appId}&start=${start}&end=${end}`;
      const res = await fetch(url, { method: "GET", headers: headers });
      if (res.ok) return await res.json();
      return [];
    } catch (e) {
      return [];
    }
  },
  upload: async (appId: string, metric: SpeedInsight) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      headers.append("Content-Type", "application/json");
      const url = `${prefix}/metric?appId=${appId}`;
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(metric),
      });
      if (res.ok) return await res.json();
      return null;
    } catch (e) {
      return null;
    }
  },
  uploadBatch: async (appId: string, metrics: SpeedInsight[]) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      headers.append("Content-Type", "application/json");
      const url = `${prefix}/metric/batch?appId=${appId}`;
      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(metrics),
      });
      if (res.ok) return await res.json();
      return null;
    } catch (e) {
      return null;
    }
  },
  delete: async (appId: string, metricId: string) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      const url = `${prefix}/metric/${appId}/${metricId}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      if (res.ok) return await res.json();
      return null;
    } catch (e) {
      return null;
    }
  },
  deleteBatch: async (appId: string, metrics: string[]) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader() || "";
      headers.append("authorization", authHeader);
      headers.append("Content-Type", "application/json");
      const url = `${prefix}/metric/batch?appId=${appId}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(metrics),
      });
      if (res.ok) return await res.json();
      return null;
    } catch (e) {
      return null;
    }
  },
};
