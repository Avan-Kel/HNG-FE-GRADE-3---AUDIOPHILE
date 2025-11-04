// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    createdAt: v.number(),
  }),

  cart: defineTable({
    slug: v.string(),
    name: v.string(),
    price: v.number(),
    image: v.string(),
    quantity: v.number(),
    userId: v.string(),
  }),

  orders: defineTable({
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
});
