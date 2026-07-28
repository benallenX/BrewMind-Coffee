import { redirect } from "next/navigation";

import {
  InactiveUserError,
  InsufficientRoleError,
  UnauthenticatedError,
  requireAdmin,
} from "@/lib/auth/authorization";

/** Server boundary for /admin. Requires the ADMIN role. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch (error) {
    if (error instanceof InactiveUserError) {
      redirect("/");
    }
    if (error instanceof InsufficientRoleError) {
      // CUSTOMER or STAFF
      redirect("/dashboard");
    }
    if (error instanceof UnauthenticatedError) {
      // Defensive fallback — proxy.ts already requires a session here.
      redirect("/sign-in");
    }
    throw error;
  }

  return <>{children}</>;
}
