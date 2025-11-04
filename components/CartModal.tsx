"use client";

import { CartItem } from "@/lib/utils";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  orderItems: CartItem[];
  orderTotal: number;
  orderId?: string | number;
}

export default function OrderModal({ open, onClose, orderItems, orderTotal, orderId }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-orange-500 w-12 h-12 flex items-center justify-center rounded-full text-white font-bold">✓</div>
          <h2 className="text-xl font-bold">Thank you for your order</h2>
          <p className="text-center text-sm text-gray-600">Your order has been placed successfully{orderId ? ` — #${orderId}` : ""}.</p>

          <div className="w-full bg-gray-50 rounded p-4 mt-2">
            {orderItems.slice(0, 3).map((it) => (
              <div key={it.slug} className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 relative">
                  <Image src={`/assets/${it.image}`} alt={it.name} fill sizes="48px" className="object-contain rounded" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{it.name}</div>
                  <div className="text-xs text-gray-500">${it.price} × {it.quantity}</div>
                </div>
              </div>
            ))}
            {orderItems.length > 3 && <div className="text-xs text-gray-500">and {orderItems.length - 3} more...</div>}
            <div className="mt-3 text-right font-bold">Grand total: ${orderTotal.toLocaleString()}</div>
          </div>

          <button onClick={onClose} className="mt-4 px-6 py-2 bg-black text-white rounded">Back to Home</button>
        </div>
      </div>
    </div>
  );
}
