// convex/orders.ts
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const create = internalMutation({
  args: {
    order: v.object({
      customer: v.object({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
      }),
      shipping: v.object({
        address: v.string(),
        city: v.string(),
        country: v.string(),
        zip: v.string(),
      }),
      payment: v.string(),
      items: v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          price: v.number(),
          quantity: v.number(),
          image: v.optional(v.string()),
        })
      ),
      totals: v.object({
        subtotal: v.number(),
        shipping: v.number(),
        vat: v.number(),
        grandTotal: v.number(),
      }),
      status: v.string(),
      createdAt: v.string(),
    }),
  },

  handler: async ({ db }, { order }) => {
    const id = await db.insert("orders", order);
    return id;
  },
});
