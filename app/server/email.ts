// server/email.ts (server-only)
import type { CheckoutPayload } from "@/lib/checkout";

const RESEND_API_KEY: string | undefined = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "orders@yourdomain.com";

// Type for order stored in DB (adjust fields if needed)
export interface OrderRecord {
  id: string;
  createdAt: number;
  totals?: {
    grandTotal: number;
  };
}

export async function sendOrderEmailResend(
  payload: CheckoutPayload,
  orderRecord: OrderRecord
) {
  if (!RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

  const html = renderOrderEmailHtml(payload, orderRecord);

  const body = {
    from: EMAIL_FROM,
    to: payload.customer.email,
    subject: `Your order ${orderRecord.id} — Audiophile`,
    html,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Resend failed: ${res.status} ${txt}`);
  }

  return true;
}

function renderOrderEmailHtml(payload: CheckoutPayload, orderRecord: OrderRecord) {
  const itemsHtml = payload.items
    .map(
      (i) => `<tr>
        <td style="padding:8px 0;font-size:14px">${escapeHtml(i.name)}</td>
        <td style="padding:8px 0;text-align:right;font-size:14px">${i.quantity} × $${i.price}</td>
      </tr>`
    )
    .join("");

  const grandTotal =
    orderRecord.totals?.grandTotal ?? payload.totals.grandTotal;

  return `
  <div style="font-family: Arial, sans-serif; color:#111">
    <div style="max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#D87D4A;text-align:center;margin-bottom:4px">
        Thanks for your order, ${escapeHtml(payload.customer.name)}!
      </h2>

      <p style="text-align:center;color:#444;margin-top:0">
        Order <strong>${orderRecord.id}</strong> —
        ${new Date(orderRecord.createdAt).toLocaleString()}
      </p>

      <table style="width:100%;border-collapse:collapse;margin-top:18px;">
        ${itemsHtml}
      </table>

      <div style="margin-top:16px;text-align:right;font-weight:bold">
        Grand total: $${grandTotal}
      </div>

      <h4 style="margin-top:18px">Shipping address</h4>
      <p style="margin:0">
        ${escapeHtml(payload.shipping.address)},
        ${escapeHtml(payload.shipping.city)}
        ${escapeHtml(payload.shipping.zip)},
        ${escapeHtml(payload.shipping.country)}
      </p>

      <p style="margin-top:18px;color:#666;font-size:13px">
        If you have any questions, reply to this email or contact support@yourdomain.com
      </p>

      <div style="text-align:center;margin-top:20px;">
        <a href="https://yourdomain.com/order/${orderRecord.id}"
           style="display:inline-block;padding:10px 16px;background:#111;color:#fff;border-radius:6px;text-decoration:none">
           View your order
        </a>
      </div>

      <p style="font-size:12px;color:#999;margin-top:18px">
        Audiophile • support@yourdomain.com
      </p>
    </div>
  </div>
  `;
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        } as const
      )[c] || c
  );
}
