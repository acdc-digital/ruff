import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  users: defineTable({
    // Clerk user ID (from ctx.auth.getUserIdentity().subject)
    clerkId: v.string(),
    // User profile information
    email: v.string(),
    name: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // Timestamps
    lastSeen: v.number(),
  })
    // Index to find users by their Clerk ID
    .index("by_clerk_id", ["clerkId"])
    // Index to find users by email
    .index("by_email", ["email"]),
});
