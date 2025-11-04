import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCart = query({
  handler: async ({ db, auth }) => {
    const userId = (await auth.getUserIdentity())?._id;
    if (!userId) return [];
    return await db.query("cart").filter(q => q.eq(q.field("userId"), userId)).collect();
  }
});

export const setQuantity = mutation({
  args: { slug: v.string(), quantity: v.number() },
  handler: async ({ db, auth }, { slug, quantity }) => {
    const identity = await auth.getUserIdentity();
    const userId = identity?._id?.toString();
    if (!userId) return;
    const item = await db.query("cart")
      .filter(q => q.eq(q.field("slug"), slug))
      .filter(q => q.eq(q.field("userId"), userId))
      .unique();
    if (!item) return;
    return db.patch(item._id, { quantity });
  }
});

export const addToCart = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
  },
  handler: async ({ db, auth }, { slug, name, price, image }) => {
    const identity = await auth.getUserIdentity();
    const userId = identity?._id?.toString();
    if (!userId) return;

    const existing = await db.query("cart")
      .filter(q => q.eq(q.field("slug"), slug))
      .filter(q => q.eq(q.field("userId"), userId))
      .first();

    if (existing) {
      return db.patch(existing._id, { quantity: existing.quantity + 1 });
    }

    return db.insert("cart", {
      slug,
      name,
      price,
      image,
      quantity: 1,
      userId,
    });
  },
});


export const removeItem = mutation({
  args: { slug: v.string() },
  handler: async ({ db, auth }, { slug }) => {
    const userId = (await auth.getUserIdentity())?._id;
    if (!userId) return;

    const item = await db.query("cart")
      .filter(q => q.eq(q.field("userId"), userId))
      .first();

    if (item) await db.delete(item._id);
  },
});

export const clear = mutation({
  handler: async ({ db, auth }) => {
    const userId = (await auth.getUserIdentity())?._id;
    if (!userId) return;

    const items = await db.query("cart")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();

    for (const item of items) {
      await db.delete(item._id);
    }
  },
});
