"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderRecord {
  id: string;
  items: OrderItem[];
  totals: {
    grandTotal: number;
  };
  customer?: {
    name: string;
  };
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    if (!orderId) return;

    // Fetch order data from backend (Convex or fallback)
    // For now, simulate local fetch until Convex query is implemented
    fetch(`/api/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch(() => {});
  }, [orderId]);

  if (!orderId) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center">
        <p>No order found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-orange-500 text-white px-6 py-3 uppercase tracking-wide"
        >
          Back to Home
        </button>
      </main>
    );
  }

  const firstItem = order?.items?.[0];
  const remainingCount = (order?.items?.length || 1) - 1;

  return (
    <main className="min-h-screen bg-[#F1F1F1] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center text-center">
          <div className="bg-orange-500 text-white rounded-full p-3 w-12 h-12 flex items-center justify-center">
            ✅
          </div>

          <h2 className="text-2xl font-bold mt-4 uppercase">
            Thank you for your order
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            You will receive an email confirmation shortly.
          </p>
        </div>

        {/* Summary Box */}
        <div className="mt-6 bg-[#F1F1F1] rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-300">
            {firstItem && (
              <div className="flex items-center gap-4">
                {firstItem.image && (
                  <Image
                    src={firstItem.image}
                    alt={firstItem.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="uppercase font-bold">{firstItem.name}</p>
                  <p className="text-gray-400 text-sm">
                    ${firstItem.price.toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-600 font-bold">x{firstItem.quantity}</p>
              </div>
            )}

            {remainingCount > 0 && (
              <p className="text-center mt-4 text-gray-600 text-sm">
                and {remainingCount} other item(s)
              </p>
            )}
          </div>

          <div className="bg-black text-white p-6 flex justify-between items-center">
            <p className="uppercase text-sm opacity-70">Grand Total</p>
            <p className="text-lg font-bold">
              ${order?.totals?.grandTotal.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 transition text-white py-4 uppercase tracking-wider font-semibold rounded"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}
