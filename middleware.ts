import { NextResponse, type NextRequest } from "next/server";
import {
  ONBOARDING_STEP_SLUGS,
  AUTH_REQUIRED_FROM_INDEX,
  isValidStepSlug,
} from "@/lib/onboarding/step-order";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type SessionUser = {
  onboardingCompleted: boolean;
  onboardingStep: string;
} | null;

async function getSessionUser(request: NextRequest): Promise<SessionUser> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { cookie: request.headers.get("cookie") ?? "" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const { user } = await res.json();
    return user;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const currentSlug = pathname.split("/").filter(Boolean).pop() ?? "";

  const user = await getSessionUser(request);

  if (!user) {
    if (isDashboardRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/onboarding/welcome", request.url));
    }
    if (
      isOnboardingRoute &&
      isValidStepSlug(currentSlug) &&
      ONBOARDING_STEP_SLUGS.indexOf(currentSlug) >= AUTH_REQUIRED_FROM_INDEX
    ) {
      return NextResponse.redirect(
        new URL("/onboarding/create-account", request.url),
      );
    }
    return NextResponse.next();
  }

  if (user.onboardingCompleted) {
    if (isOnboardingRoute || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const savedStep = isValidStepSlug(user.onboardingStep)
    ? user.onboardingStep
    : "profile";
  if (isDashboardRoute || pathname === "/") {
    return NextResponse.redirect(
      new URL(`/onboarding/${savedStep}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/onboarding/:path*", "/dashboard/:path*"],
};
