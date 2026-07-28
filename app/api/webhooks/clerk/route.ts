import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

import {
  deactivateClerkUserProfile,
  syncCreatedClerkUser,
  syncUpdatedClerkUser,
} from "@/lib/auth/user-profile";

/**
 * Clerk webhook receiver. Public route (see proxy.ts — only /dashboard,
 * /staff, and /admin require a session; everything else, including this
 * route, is public by default). Authenticity is enforced entirely by
 * `verifyWebhook`'s signature check, not by session/route protection.
 *
 * This route stays thin: verify, narrow by event type, delegate to
 * lib/auth/user-profile.ts. No Prisma calls or business logic live here.
 */
export async function POST(req: NextRequest) {
  let evt;

  try {
    evt = await verifyWebhook(req);
  } catch (error) {
    console.error("Clerk webhook signature verification failed.", error);
    return new Response("Invalid signature.", { status: 400 });
  }

  switch (evt.type) {
    case "user.created":
      await syncCreatedClerkUser(evt.data);
      break;
    case "user.updated":
      await syncUpdatedClerkUser(evt.data);
      break;
    case "user.deleted": {
      const clerkUserId = evt.data.id;
      if (clerkUserId) {
        await deactivateClerkUserProfile(clerkUserId);
      }
      break;
    }
    default:
      // Unsupported event type — acknowledge without touching the database.
      break;
  }

  return new Response("OK", { status: 200 });
}
