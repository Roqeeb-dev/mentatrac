import type { Metadata } from "next";
import { AuthSidebar } from "@/features/auth/components/AuthSidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | Mentatrac",
    default: "Authentication | Mentatrac",
  },
  description: "Sign in or manage your Mentatrac account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <div className="hidden lg:block w-[450px] shrink-0">
        <AuthSidebar />
      </div>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-[500px]">{children}</div>
      </main>
    </div>
  );
}
