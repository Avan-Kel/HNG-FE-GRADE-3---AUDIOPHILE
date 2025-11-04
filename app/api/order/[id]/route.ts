// app/api/order/[id]/route.ts
import { NextResponse } from "next/server";
// TODO: Replace with real Convex query
// import { getOrderFromConvex } from "@/server/convex-orders";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // TEMP fallback so the UI shows real example data
  return NextResponse.json({
    id,
    items: [
      { name: "XX99 Mark II", price: 2999, quantity: 1, image: "/images/xx99-mark-2.png" },
      { name: "YX1 Earphones", price: 599, quantity: 2, image: "/images/yx1.png" },
    ],
    totals: { grandTotal: 4197 },
  });
}
