// app/api/order/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function GET(req: Request, context: any) {
  const { id } = context.params as { id: string };

  return new Response(
    JSON.stringify({
      id,
      items: [
        { name: "XX99 Mark II", price: 2999, quantity: 1, image: "/images/xx99-mark-2.png" },
        { name: "YX1 Earphones", price: 599, quantity: 2, image: "/images/yx1.png" },
      ],
      totals: { grandTotal: 4197 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

