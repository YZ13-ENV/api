import { DateTime } from "luxon";
import { sign } from "jsonwebtoken";
const api_host = (
  // 'https://www.api.darkmaterial.space'
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_HOST_DEV : process.env.NEXT_PUBLIC_API_HOST_PROD
);
const createTokenWithPayload = (payload) => {
  if (process.env.NEXT_PUBLIC_JWT_SECRET) {
    const token = sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET);
    return token;
  } else {
    return null;
  }
};
const authorizationHeader = () => {
  const time = DateTime.now().toSeconds();
  const payload = {
    iat: time
  };
  const token = createTokenWithPayload(payload);
  return token;
};
const auth = {
  travel: async (uid) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/auth/travel?uid=${uid}`;
      const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
      if (res.ok)
        return await res.text();
      return null;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
};
const blog = {
  getLast: async (category) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/portfolio/last${category ? `/${category}` : ""}?limit=5`;
      const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if ((json == null ? void 0 : json.error) === true)
          throw new Error(json == null ? void 0 : json.text);
        const posts = json;
        return posts;
      } else
        return [];
    } catch (e) {
      console.warn(e);
      return [];
    }
  },
  getAll: async (category) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/portfolio/all${category ? `/${category}` : ""}?skip=0`;
      const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
      if (res.ok) {
        const posts = await res.json();
        return posts;
      }
      return { count: 0, data: [], next: "" };
    } catch (e) {
      console.log(e);
      return { count: 0, data: [], next: "" };
    }
  },
  getById: async (postId) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/portfolio/${postId}`;
      const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
      if (res.ok)
        return await res.json();
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteOne: async (postId) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/portfolio/${postId}`;
      const res = await fetch(url, { method: "DELETE", headers });
      if (res.ok)
        return Boolean(await res.text());
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateOne: async (postId, post) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", authHeader || "");
      const body = JSON.stringify(post, null, 2);
      const url = `${api_host}/portfolio/${postId}`;
      const res = await fetch(url, { method: "PATCH", body, headers });
      if (res.ok)
        return await res.json();
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  search: async (query) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", authHeader || "");
      const url = `${api_host}/portfolio/search/${query.toLowerCase()}`;
      const res = await fetch(url, { method: "GET", headers });
      if (res.ok)
        return await res.json();
      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  addOne: async (postId, post) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("Content-Type", "application/json");
      headers.append("authorization", authHeader || "");
      const body = JSON.stringify(post, null, 2);
      const url = `${api_host}/portfolio/${postId}`;
      const res = await fetch(url, { method: "POST", body, headers });
      if (res.ok)
        return await res.json();
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};
const file = {
  static: {
    get: async (path) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const stablePath = path.startsWith("/") ? path : `/${path}`;
        const url = `${api_host}${stablePath}`;
        const res = await fetch(url, { headers });
        if (res.ok) {
          const body = res.body ? res.body.getReader() : null;
          if (body) {
            const file2 = await body.read();
            const content_type = res.headers.get("content-type");
            if (file2.value && content_type) {
              const base64String = btoa(String.fromCharCode(...new Uint8Array(file2.value)));
              if (!base64String)
                throw new Error("Error");
              const result = `data:${content_type};base64,${base64String}`;
              return result;
            } else
              throw new Error("Error");
          } else
            throw new Error("Error");
        }
        return null;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  },
  upload: {
    file: async (link, file2) => {
      const form = new FormData();
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        form.append("file", file2);
        const uploadedRes = await fetch(`${api_host}/files/file?link=${link}`, {
          method: "POST",
          headers,
          body: form
        });
        if (uploadedRes.ok) {
          const uploadedFile = await uploadedRes.text();
          return uploadedFile;
        }
        return null;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    delete: async (url) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        await fetch(`${api_host}/files/file?link=${url}`, { method: "DELETE", headers });
        return true;
      } catch (e) {
        return false;
      }
    }
  }
};
const user = {
  byId: {
    short: async (userId) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const userRes = await fetch(`${api_host}/users/uid/${userId}`, { method: "GET", cache: "no-store", headers });
        const user2 = await userRes.json();
        return user2;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    updateProfile: async (uid, data) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const url = `${api_host}/users/uid/${uid}`;
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data)
        });
        if (res.ok)
          return Boolean(await res.json());
        return false;
      } catch (e) {
        return false;
      }
    },
    update: async (uid, field) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const url = `${api_host}/users/claim/${uid}`;
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(field)
        });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    }
  },
  byNick: {
    short: async (nick, check) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const res = await fetch(`${api_host}/users/nickname/${nick}${check ? "?check=true" : ""}`, { method: "GET", cache: "no-store", headers });
        if (check)
          return Boolean(await res.text());
        const user2 = await res.json();
        return user2;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    create: async (nick, uid) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_host}/users/nickname/${nick}?uid=${uid}`;
        const res = await fetch(url, { method: "POST", headers });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    delete: async (nick) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_host}/users/nickname/${nick}`;
        const res = await fetch(url, { method: "Delete", headers });
        if (res.ok)
          return Boolean(await res.text());
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
const notifications = {
  push: async (message) => {
    try {
      const headers = new Headers();
      const authHeader = authorizationHeader();
      headers.append("authorization", authHeader || "");
      const key = process.env.NEXT_PUBLIC_PUSH_KEY;
      if (!key)
        throw new Error("No key");
      const res = await fetch(`${api_host}/notifications/pushMe?key=${key}&message=${message}`, { method: "POST", headers });
      return res.ok;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
const cdn = (link) => {
  const isStartWithSlash = link.startsWith("/");
  const fetchUrl = isStartWithSlash ? `https://cdn.darkmaterial.space${link}` : `https://cdn.darkmaterial.space/${link}`;
  return fetchUrl;
};
export {
  auth,
  authorizationHeader,
  blog,
  cdn,
  file,
  notifications,
  user
};
