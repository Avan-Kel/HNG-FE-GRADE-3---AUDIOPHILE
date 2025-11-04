// lib/checkout.ts
import { z } from "zod";

export const OrderItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
  image: z.string().optional()
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const CheckoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7)
  }),
  shipping: z.object({
    address: z.string().min(3),
    zip: z.string().min(2),
    city: z.string().min(2),
    country: z.string().min(2)
  }),
  payment: z.object({
    method: z.enum(["e-money", "cod"]),
    emoneyNumber: z.string().optional(),
    emoneyPin: z.string().optional()
  }),
  items: z.array(OrderItemSchema).min(1),
  totals: z.object({
    subtotal: z.number().min(0),
    shipping: z.number().min(0),
    vat: z.number().min(0),
    grandTotal: z.number().min(0)
  })
});

export type CheckoutPayload = z.infer<typeof CheckoutSchema>;
