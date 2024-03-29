import { ConvexError, v } from "convex/values";
import { MutationCtx, QueryCtx, internalMutation, mutation, query } from "./_generated/server";

export const createUser = internalMutation({
  args: { name: v.string(), email: v.string(), tokenIdentifier: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      discId: `${args.name?.replace(/\s/g, "").toLowerCase()}#${Math.floor(1000 + Math.random() * 9000)}`,
      tokenIdentifier: args.tokenIdentifier,
    })
  },
})

export const getUser = query({
  args: { tokenIdentifier: v.string() },
  async handler(ctx, args) {
    return await ctx.db.query("users").withIndex("by_token", (q) => q.eq("tokenIdentifier", args.tokenIdentifier)).first()
  },
})

export const getUserByEmail = query({
  args: { 
    email: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db.query("users").withIndex("by_email", (q) => q.eq("email", args.email)).first()
  },
})