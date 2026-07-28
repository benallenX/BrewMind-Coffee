/**
 * Pure normalization of Clerk user data into BrewMind identity fields.
 *
 * Two input shapes exist depending on where the data comes from:
 * - Webhook payloads (`evt.data`) use Clerk's snake_case Backend API JSON shape.
 * - `clerkClient().users.getUser()` / `currentUser()` return the camelCase
 *   Backend User object.
 *
 * Both shapes carry a primary-email *id*, not a primary-email value directly —
 * the primary address must be looked up by matching that id against the
 * email list. `email_addresses[0]` / `emailAddresses[0]` is not guaranteed to
 * be the primary address.
 *
 * No role or Prisma logic lives here — this module only shapes data.
 */

export type NormalizedClerkUser = {
  clerkUserId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

type WebhookEmailAddress = {
  id: string;
  email_address: string;
};

/** The subset of the webhook `user.*` JSON payload this module reads. */
export type ClerkWebhookUserPayload = {
  id: string;
  email_addresses?: WebhookEmailAddress[] | null;
  primary_email_address_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
};

type BackendEmailAddress = {
  id: string;
  emailAddress: string;
};

/** The subset of the Backend User object (clerkClient/currentUser) this module reads. */
export type ClerkBackendUser = {
  id: string;
  emailAddresses?: BackendEmailAddress[] | null;
  primaryEmailAddressId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

function toNullable(value: string | null | undefined): string | null {
  return value ?? null;
}

/** Normalize a Clerk webhook `user.*` event payload (snake_case). */
export function normalizeWebhookUser(
  data: ClerkWebhookUserPayload,
): NormalizedClerkUser {
  const emailAddresses = data.email_addresses ?? [];
  const primary = emailAddresses.find(
    (address) => address.id === data.primary_email_address_id,
  );

  return {
    clerkUserId: data.id,
    email: toNullable(primary?.email_address),
    firstName: toNullable(data.first_name),
    lastName: toNullable(data.last_name),
  };
}

/** Normalize a canonical Clerk Backend User object (camelCase). */
export function normalizeBackendUser(
  user: ClerkBackendUser,
): NormalizedClerkUser {
  const emailAddresses = user.emailAddresses ?? [];
  const primary = emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  );

  return {
    clerkUserId: user.id,
    email: toNullable(primary?.emailAddress),
    firstName: toNullable(user.firstName),
    lastName: toNullable(user.lastName),
  };
}
