import { ApiError } from "./errors";

type Overrides = { fallback?: string } & Partial<Record<number, string>>;

const DEFAULTS: Record<number, string> = {
  401: "Your session has expired. Please log in again.",
  403: "You don't have permission to do that.",
  404: "We couldn't find what you were looking for.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Something went wrong on our side. Please try again shortly.",
};

export function getErrorMessage(err: unknown, overrides: Overrides = {}) {
  const fallback =
    overrides.fallback ?? "Something went wrong. Please try again.";

  // fetch throws a TypeError when the network is down or the server is unreachable
  if (err instanceof TypeError) {
    return "Can't reach the server. Check your connection and try again.";
  }

  if (err instanceof ApiError) {
    const specific = overrides[err.status] ?? DEFAULTS[err.status];
    if (specific) return specific;
    if (err.status >= 500) return DEFAULTS[500];
    return err.message || fallback;
  }

  return err instanceof Error && err.message ? err.message : fallback;
}
