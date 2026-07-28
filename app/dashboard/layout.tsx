import { redirect } from "next/navigation";

import {
  InactiveUserError,
  UnauthenticatedError,
  requireActiveUser,
} from "@/lib/auth/authorization";

/**
 * Server boundary for /dashboard. `requireActiveUser()` runs the
 * ensureUserProfile() fallback internally, so a profile is created here on
 * first authenticated access if the webhook hasn't landed yet.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireActiveUser();
  } catch (error) {
    if (error instanceof InactiveUserError) {
      redirect("/");
    }
    if (error instanceof UnauthenticatedError) {
      // Defensive fallback — proxy.ts already requires a session here.
      redirect("/sign-in");
    }
    throw error;
  }

  return <>{children}</>;
}
