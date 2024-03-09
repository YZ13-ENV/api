import { api_host } from "@/const/host";
import { DocDefaultProject, authorizationHeader } from "..";

const prefix = `${api_host}/default`;

export const default_api = {
  all: async (): Promise<DocDefaultProject[]> => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = prefix + "/projects";
      const res = await fetch(url, { method: "GET", headers: headers });
      if (res.ok) return await res.json();
      return [];
    } catch (e) {
      return [];
    }
  },
};
