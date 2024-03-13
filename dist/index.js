(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("luxon"), require("jsonwebtoken")) : typeof define === "function" && define.amd ? define(["exports", "luxon", "jsonwebtoken"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.api = {}, global.luxon, global.jsonwebtoken));
})(this, function(exports2, luxon, jsonwebtoken) {
  "use strict";
  const api_host = (
    // 'https://www.api.darkmaterial.space'
    process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_HOST_DEV : process.env.NEXT_PUBLIC_API_HOST_PROD
  );
  const createTokenWithPayload = (payload) => {
    if (process.env.NEXT_PUBLIC_JWT_SECRET) {
      const token = jsonwebtoken.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET);
      return token;
    } else {
      return null;
    }
  };
  const authorizationHeader = () => {
    const time = luxon.DateTime.now().toSeconds();
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
  const bum = {
    author: {
      saved: async (uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/user/saved?id=${uid}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      mostPopularShot: async (uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/user/popular?id=${uid}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          return null;
        }
      },
      last: async (uid, exclude) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/user/last?id=${uid}${exclude ? `&exclude=${exclude}` : ""}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      follow: async (from, to) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(
            `${api_host}/shots/user/follow?from=${from}&to=${to}`,
            {
              method: "GET",
              headers
            }
          );
          if (res.ok) {
            return await res.json();
          } else
            return [];
        } catch (e) {
          console.log(e);
          return [];
        }
      },
      addAbout: async (id, about) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(
            `${api_host}/shots/user/about?id=${id}&about=${about}`,
            {
              method: "POST",
              headers
            }
          );
          if (res.ok) {
            return await res.text();
          } else
            return "";
        } catch (e) {
          console.log(e);
          return "";
        }
      },
      getAbout: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(`${api_host}/shots/user/about?id=${id}`, {
            method: "GET",
            headers
          });
          if (res.ok) {
            return await res.text();
          } else
            return "";
        } catch (e) {
          console.log(e);
          return "";
        }
      },
      addSignature: async (id, signature) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(
            `${api_host}/shots/user/signature?id=${id}&signature=${signature}`,
            {
              method: "POST",
              headers
            }
          );
          if (res.ok) {
            return await res.text();
          } else
            return "";
        } catch (e) {
          console.log(e);
          return "";
        }
      },
      getSignature: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(`${api_host}/shots/user/signature?id=${id}`, {
            method: "GET",
            headers
          });
          if (res.ok) {
            return await res.text();
          } else
            return "";
        } catch (e) {
          console.log(e);
          return "";
        }
      },
      likes: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(`${api_host}/shots/user/likes?id=${id}`, {
            method: "GET",
            headers
          });
          if (res.ok) {
            return await res.json();
          } else
            return [];
        } catch (e) {
          console.log(e);
          return [];
        }
      },
      followers: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(`${api_host}/shots/user/followers?id=${id}`, {
            method: "GET",
            headers
          });
          if (res.ok) {
            return await res.json();
          } else
            return [];
        } catch (e) {
          console.log(e);
          return [];
        }
      },
      followings: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const res = await fetch(`${api_host}/shots/user/following?id=${id}`, {
            method: "GET",
            headers
          });
          if (res.ok) {
            return await res.json();
          } else
            return [];
        } catch (e) {
          console.log(e);
          return [];
        }
      }
    },
    attachments: {
      generate: async (path, file2, asThumbnail) => {
        try {
          const headers = new Headers();
          const form = new FormData();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/attachments?id=${path}${asThumbnail ? `&asThumbnail=${asThumbnail}` : ""}`;
          form.append("file", file2);
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: form
          });
          if (res.ok) {
            const attachment = await res.json();
            return attachment;
          } else
            return null;
        } catch (e) {
          console.warn(e);
          return null;
        }
      }
    },
    drafts: {
      all: async (order, category) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_host}/shots/all/${order}/${category}?onlyDrafts=true` : order ? `${api_host}/shots/all/${order}?onlyDrafts=true` : `${api_host}/shots/all/popular?onlyDrafts=true`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      },
      byUser: async (order, category, uid) => {
        try {
          if (!uid)
            throw Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_host}/shots/user/${uid}/${order}/${category}?onlyDrafts=true` : order ? `${api_host}/shots/user/${uid}/${order}?onlyDrafts=true` : `${api_host}/shots/user/${uid}?onlyDrafts=true`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      }
    },
    shots: {
      search: async (query, order, category, uid) => {
        try {
          if (order === "following" && !uid)
            throw Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_host}/shots/search/${query}/${order}/${category}?uid=${uid}` : order ? `${api_host}/shots/search/${query}/${order}?uid=${uid}` : `${api_host}/shots/search/${query}/popular?uid=${uid}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      },
      byUser: async (uid, order, category) => {
        try {
          if (!uid)
            throw Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_host}/shots/user/${uid}/${order}/${category}` : order ? `${api_host}/shots/user/${uid}/${order}` : `${api_host}/shots/user/${uid}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      },
      tags: async () => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/tags`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok) {
            const tags = await res.json();
            return tags;
          } else
            return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      },
      all: async (order, category, uid) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_host}/shots/all/${order}/${category}${uid ? `?uid=${uid}` : ""}` : order ? `${api_host}/shots/all/${order}${uid ? `?uid=${uid}` : ""}` : `${api_host}/shots/all/popular${uid ? `?uid=${uid}` : ""}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      },
      byTag: async (tag, order) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const fetchUrl = `${api_host}/tags/${tag}/${order}`;
          const res = await fetch(fetchUrl, { method: "GET", headers });
          if (res.ok) {
            const shots = await res.json();
            return shots;
          } else
            return [];
        } catch (e) {
          console.log(e);
          return [];
        }
      },
      byType: async (userId, type = "shots", order) => {
        const requestType = type === "shots" ? "onlyShots" : "onlyDrafts";
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const shotsRes = await fetch(
            `${api_host}/shots/${requestType}/${userId}${order ? `?order=${order}` : ""}`,
            {
              headers
            }
          );
          const shots = await shotsRes.json();
          return shots;
        } catch (e) {
          console.log(e);
          return [];
        }
      }
    },
    shot: {
      like: async (id, uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/shot/${id}/like?uid=${uid}`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      view: async (id, uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/shot/${id}/view?uid=${uid}`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      addComment: async (id, comment) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_host}/shots/shot/${id}/comment`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(comment)
          });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      deleteComment: async (id, commentId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/shot/${id}/comment?commentId=${commentId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          return false;
        }
      },
      get: async (shotId, userId) => {
        try {
          if (userId) {
            const shotRes = await fetch(
              `${api_host}/shots/shot/${shotId}/${userId}`,
              { method: "GET", cache: "no-store" }
            );
            const shot = await shotRes.json();
            return shot;
          } else {
            const shotRes = await fetch(`${api_host}/shots/shot/${shotId}`, {
              method: "GET",
              cache: "no-store"
            });
            const shot = await shotRes.json();
            return shot;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      create: async (id, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_host}/shots/shot/${id}`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      update: async (id, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_host}/shots/shot/${id}`;
          const res = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      delete: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/shot/${id}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      getPopularOne: async (userId) => {
        try {
          const shots = await bum.shots.byType(userId, "shots", "popular");
          if (shots.length !== 0) {
            return shots[0];
          } else
            return null;
        } catch (e) {
          return null;
        }
      }
    },
    draft: {
      get: async (shotId) => {
        try {
          const res = await fetch(`${api_host}/shots/draft/${shotId}`, {
            method: "GET",
            cache: "no-store"
          });
          const draft = await res.json();
          return draft;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      create: async (id, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_host}/shots/draft/${id}`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
      update: async (id, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_host}/shots/draft/${id}`;
          const res = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      delete: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/shots/draft/${id}`;
          const res = await fetch(url, { method: "DELETE", headers });
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
  const prefix$1 = `${api_host}/default`;
  const default_api = {
    all: async () => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = prefix$1 + "/projects";
        const res = await fetch(url, { method: "GET", headers });
        if (res.ok)
          return await res.json();
        return [];
      } catch (e) {
        return [];
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
          const res = await fetch(`${api_host}/files/file?link=${url}`, { method: "DELETE", headers });
          return Boolean(await res.text());
        } catch (e) {
          return false;
        }
      }
    }
  };
  const notes = (() => {
    return {
      getNoteById: async (noteId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/notes/${noteId}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          console.warn(e);
          return null;
        }
      },
      getAllForUser: async (userId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/notes/uid/${userId}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          console.warn(e);
          return [];
        }
      },
      deleteOne: async (noteId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_host}/notes/${noteId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      updateOne: async (noteId, note) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("Content-Type", "application/json");
          headers.append("authorization", authHeader || "");
          const body = JSON.stringify(note, null, 2);
          const url = `${api_host}/notes/${noteId}`;
          const res = await fetch(url, { method: "PATCH", body, headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      addOne: async (noteId, note) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("Content-Type", "application/json");
          headers.append("authorization", authHeader || "");
          const body = JSON.stringify(note, null, 2);
          const url = `${api_host}/notes/${noteId}`;
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
  })();
  const generateNotification = (message, receiver, link) => {
    const notification = {
      message,
      receiver,
      createdAt: luxon.DateTime.now().toSeconds(),
      isViewed: false
    };
    if (link)
      notification.link = link;
    return notification;
  };
  const notifications = {
    push: async (message, receiver, link) => {
      const notification = generateNotification(message, receiver, link);
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const res = await fetch(
          `${api_host}/notifications/notification/${receiver}`,
          { method: "POST", headers, body: JSON.stringify(notification) }
        );
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    patch: async (id, notId, notification) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const res = await fetch(
          `${api_host}/notifications/notification/${id}/${notId}`,
          { method: "PATCH", headers, body: JSON.stringify(notification) }
        );
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    delete: async (id, notId) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_host}/notifications/notification/${id}/${notId}`;
        const res = await fetch(url, { method: "DELETE", headers });
        if (res.ok)
          return Boolean(await res.text());
        return false;
      } catch (e) {
        return false;
      }
    },
    all: async (id) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_host}/notifications/all/${id}`;
        const res = await fetch(url, { method: "GET", cache: "no-store", headers });
        if (res.ok)
          return await res.json();
        return [];
      } catch (e) {
        return [];
      }
    }
  };
  const prefix = `${api_host}/speed-insights`;
  const speed_insights = {
    getAll: async (appId) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        const url = `${prefix}/metric/all?appId=${appId}`;
        const res = await fetch(url, { method: "GET", headers });
        if (res.ok)
          return await res.json();
        return [];
      } catch (e) {
        return [];
      }
    },
    getRange: async (appId, start, end) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        const url = `${prefix}/metric/range?appId=${appId}&start=${start}&end=${end}`;
        const res = await fetch(url, { method: "GET", headers });
        if (res.ok)
          return await res.json();
        return [];
      } catch (e) {
        return [];
      }
    },
    upload: async (appId, metric) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        headers.append("Content-Type", "application/json");
        const url = `${prefix}/metric?appId=${appId}`;
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(metric)
        });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    uploadBatch: async (appId, metrics) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        headers.append("Content-Type", "application/json");
        const url = `${prefix}/metric/batch?appId=${appId}`;
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(metrics)
        });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    delete: async (appId, metricId) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        const url = `${prefix}/metric/${appId}/${metricId}`;
        const res = await fetch(url, {
          method: "DELETE",
          headers
        });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    deleteBatch: async (appId, metrics) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader() || "";
        headers.append("authorization", authHeader);
        headers.append("Content-Type", "application/json");
        const url = `${prefix}/metric/batch?appId=${appId}`;
        const res = await fetch(url, {
          method: "DELETE",
          headers,
          body: JSON.stringify(metrics)
        });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    }
  };
  const api_prefix = `${api_host}/team`;
  const team = {
    get: async (id) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_prefix}/${id}`;
        const res = await fetch(url, { method: "GET", headers });
        if (res.ok) {
          return await res.json();
        } else
          return null;
      } catch (e) {
        return null;
      }
    },
    create: async (id, team2) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const url = `${api_prefix}/${id}`;
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(team2)
        });
        if (res.ok) {
          return await res.json();
        } else
          return null;
      } catch (e) {
        return null;
      }
    },
    update: async (id, team2) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        headers.append("Content-Type", "application/json");
        const url = `${api_prefix}/${id}`;
        const res = await fetch(url, {
          method: "PATCH",
          headers,
          body: JSON.stringify(team2)
        });
        if (res.ok) {
          return await res.json();
        } else
          return null;
      } catch (e) {
        return null;
      }
    },
    delete: async (id) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_prefix}/${id}`;
        const res = await fetch(url, { method: "DELETE", headers });
        if (res.ok) {
          return Boolean(await res.text());
        } else
          return false;
      } catch (e) {
        return false;
      }
    },
    likes: async (id) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const res = await fetch(`${api_prefix}/${id}/likes`, {
          method: "GET",
          headers
        });
        if (res.ok) {
          return await res.json();
        } else
          return [];
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    followings: async (id) => {
      try {
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const res = await fetch(`${api_prefix}/${id}/following`, {
          method: "GET",
          headers
        });
        if (res.ok) {
          return await res.json();
        } else
          return [];
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    mostPopularShot: async (id) => {
      try {
        if (!id)
          throw new Error("uid is not provided");
        const headers = new Headers();
        const authHeader = authorizationHeader();
        headers.append("authorization", authHeader || "");
        const url = `${api_prefix}/${id}/popular`;
        const res = await fetch(url, { method: "GET", headers });
        if (res.ok)
          return await res.json();
        return null;
      } catch (e) {
        return null;
      }
    },
    task: {
      config: {
        get: async (id) => {
          try {
            const headers = new Headers();
            const authHeader = authorizationHeader();
            headers.append("authorization", authHeader || "");
            const url = `${api_prefix}/${id}/tasks/config`;
            const res = await fetch(url, { method: "GET", headers });
            if (res.ok)
              return await res.json();
            return null;
          } catch (e) {
            return null;
          }
        },
        update: async (id, cfg) => {
          try {
            const headers = new Headers();
            const authHeader = authorizationHeader();
            headers.append("authorization", authHeader || "");
            headers.append("Content-Type", "application/json");
            const url = `${api_prefix}/${id}/tasks/config`;
            const res = await fetch(url, {
              method: "PATCH",
              headers,
              body: JSON.stringify(cfg)
            });
            if (res.ok)
              return await res.json();
            return null;
          } catch (e) {
            return null;
          }
        },
        delete: async (id) => {
          try {
            const headers = new Headers();
            const authHeader = authorizationHeader();
            headers.append("authorization", authHeader || "");
            const url = `${api_prefix}/${id}/tasks/config`;
            const res = await fetch(url, { method: "DELETE", headers });
            if (res.ok)
              return Boolean(await res.text());
            return false;
          } catch (e) {
            return false;
          }
        }
      },
      all: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/tasks/all`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          return null;
        }
      },
      get: async (id, taskId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/tasks/${taskId}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          return null;
        }
      },
      create: async (id, scratch) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/tasks`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(scratch)
          });
          if (res.ok)
            return await res.json();
        } catch (e) {
          return null;
        }
      },
      update: async (id, taskId, scratch) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/tasks/${taskId}`;
          const res = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify(scratch)
          });
          if (res.ok)
            return await res.json();
        } catch (e) {
          return null;
        }
      },
      delete: async (id, taskId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/tasks/${taskId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          return false;
        }
      }
    },
    invite: {
      all: async (id) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/invites`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      accept: async (id, inviteId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/invite/${inviteId}/accept`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return Boolean(res.text());
          return false;
        } catch (e) {
          return false;
        }
      },
      get: async (id, inviteId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/invite/${inviteId}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          return null;
        }
      },
      invite: async (id, uid) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/invite?uid=${uid}`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return await res.json();
          return null;
        } catch (e) {
          return null;
        }
      },
      delete: async (id, inviteId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/invite/${inviteId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          return false;
        }
      }
    },
    shots: {
      last: async (id, exclude) => {
        try {
          if (!id)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/last${exclude ? `?exclude=${exclude}` : ""}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      all: async (id, order, category) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_prefix}/${id}/shots/${order}/${category}` : order ? `${api_prefix}/${id}/shots/${order}` : `${api_prefix}/${id}/shots`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      }
    },
    drafts: {
      all: async (id, order, category) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = order && category ? `${api_prefix}/${id}/shots/${order}/${category}?onlyDrafts=true` : order ? `${api_prefix}/${id}/shots/${order}?onlyDrafts=true` : `${api_prefix}/${id}/shots?onlyDrafts=true`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok)
            return await res.json();
          return { count: 0, data: [], next: "" };
        } catch (e) {
          console.warn(e);
          return { count: 0, data: [], next: "" };
        }
      }
    },
    draft: {
      get: async (id, draftId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/draft/${draftId}`;
          const res = await fetch(url, { method: "GET", headers });
          if (res.ok) {
            return await res.json();
          } else
            return null;
        } catch (e) {
          return null;
        }
      },
      create: async (id, draftId, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/draft/${draftId}`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok) {
            return Boolean(res.text());
          } else
            return false;
        } catch (e) {
          return false;
        }
      },
      update: async (id, draftId, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/draft/${draftId}`;
          const res = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok) {
            return await res.json();
          } else
            return null;
        } catch (e) {
          return null;
        }
      },
      delete: async (id, draftId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/draft/${draftId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok) {
            return Boolean(res.text());
          } else
            return false;
        } catch (e) {
          return false;
        }
      }
    },
    shot: {
      like: async (id, shotId, uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/shot/${shotId}/like?uid=${uid}`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      view: async (id, shotId, uid) => {
        try {
          if (!uid)
            throw new Error("uid is not provided");
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/shot/${shotId}/view?uid=${uid}`;
          const res = await fetch(url, { method: "POST", headers });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      addComment: async (id, shotId, comment) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/shot/${shotId}/comment`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(comment)
          });
          if (res.ok)
            return await res.json();
          return [];
        } catch (e) {
          return [];
        }
      },
      deleteComment: async (id, shotId, commentId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/shot/${shotId}/comment?commentId=${commentId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok)
            return Boolean(await res.text());
          return false;
        } catch (e) {
          return false;
        }
      },
      get: async (id, shotId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/shot/${shotId}`;
          const res = await fetch(url, { method: "", headers });
          if (res.ok) {
            return await res.json();
          } else
            return null;
        } catch (e) {
          return null;
        }
      },
      create: async (id, shotId, draft) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/shot/${shotId}`;
          const res = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(draft)
          });
          if (res.ok) {
            return Boolean(await res.text());
          } else
            return false;
        } catch (e) {
          return false;
        }
      },
      update: async (id, shotId, shot) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          headers.append("Content-Type", "application/json");
          const url = `${api_prefix}/${id}/shot/${shotId}`;
          const res = await fetch(url, {
            method: "PATCH",
            headers,
            body: JSON.stringify(shot)
          });
          if (res.ok) {
            return Boolean(await res.text());
          } else
            return false;
        } catch (e) {
          return false;
        }
      },
      delete: async (id, shotId) => {
        try {
          const headers = new Headers();
          const authHeader = authorizationHeader();
          headers.append("authorization", authHeader || "");
          const url = `${api_prefix}/${id}/shot/${shotId}`;
          const res = await fetch(url, { method: "DELETE", headers });
          if (res.ok) {
            return Boolean(await res.text());
          } else
            return false;
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
  const cdn = (link) => {
    const isStartWithSlash = link.startsWith("/");
    const fetchUrl = isStartWithSlash ? `https://cdn.darkmaterial.space${link}` : `https://cdn.darkmaterial.space/${link}`;
    return fetchUrl;
  };
  exports2.auth = auth;
  exports2.authorizationHeader = authorizationHeader;
  exports2.blog = blog;
  exports2.bum = bum;
  exports2.cdn = cdn;
  exports2.default_api = default_api;
  exports2.file = file;
  exports2.notes = notes;
  exports2.notifications = notifications;
  exports2.speed_insights = speed_insights;
  exports2.team = team;
  exports2.user = user;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
