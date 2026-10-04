import { ApiError } from "./errors";
import { useTokenStore } from "@/stores/auth-token-store";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(
  /\/+$/,
  "",
);

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
};

function buildUrl(path: string, params?: RequestOptions["params"]) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) search.set(key, String(value));
    });
  }

  const qs = search.toString();
  return `${API_BASE_URL}${cleanPath}${qs ? `?${qs}` : ""}`;
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const { refreshToken, setTokens, clearTokens } = useTokenStore.getState();
    if (!refreshToken) return null;

    try {
      const res = await fetch(buildUrl("/auth/refresh"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        clearTokens();
        return null;
      }

      const data: { accessToken: string; refreshToken: string } =
        await res.json();
      setTokens(data);
      return data.accessToken;
    } catch {
      clearTokens();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, params, headers, ...rest } = options;
  const isRefreshCall = path.includes("/auth/refresh");

  const doFetch = () => {
    const { accessToken } = useTokenStore.getState();
    return fetch(buildUrl(path, params), {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && !isRefreshCall
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch();

  if (res.status === 401 && !isRefreshCall) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      res = await doFetch();
    }
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      (data &&
        typeof data === "object" &&
        "message" in data &&
        String(data.message)) ||
      res.statusText;
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
