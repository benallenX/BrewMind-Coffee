import { redirect } from "next/navigation";

import {
  InactiveUserError,
  InsufficientRoleError,
  UnauthenticatedError,
  requireStaff,
} from "@/lib/auth/authorization";

/** Server boundary for /staff. Requires the STAFF or ADMIN role. */
export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireStaff();
  } catch (error) {
    if (error instanceof InactiveUserError) {
      redirect("/");
    }
    if (error instanceof InsufficientRoleError) {
      // CUSTOMER
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
