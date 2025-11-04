// server/convex-orders.ts (server-only)
import type { CheckoutPayload } from "@/lib/checkout";

// import { getConvexServerClient } from "@/lib/convex";

export async function saveOrderToConvex(payload: CheckoutPayload) {
  const doc = {
    customer: payload.customer,
    shipping: payload.shipping,
    payment: payload.payment,
    items: payload.items,
    totals: payload.totals,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  try {
    // If Convex client exists:
    // const convex = getConvexServerClient();
    // const convexId = await convex.mutation("orders.create", { order: doc });
    // return { id: String(convexId), ...doc };

    // Fallback
    const id = `ORD-${Date.now().toString().slice(-8)}`;
    return { id, ...doc };
  } catch (err) {
    console.error("saveOrderToConvex error:", err);
    const id = `ORD-${Date.now().toString().slice(-8)}`;
    return { id, ...doc };
  }
}
