import { NextResponse } from "next/server";
import { saveOrderToConvex } from "@/app/server/convex-orders";
import { sendOrderEmailResend } from "@/app/server/email";
import type { CheckoutPayload } from "@/lib/checkout";

export async function POST(req: Request) {
  try {
    const payload: CheckoutPayload = await req.json();

    // Save order to Convex
    const orderRecord = await saveOrderToConvex(payload);

    // Send confirmation email


    return NextResponse.json({
      ok: true,
      orderId: orderRecord.id
    });

  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
