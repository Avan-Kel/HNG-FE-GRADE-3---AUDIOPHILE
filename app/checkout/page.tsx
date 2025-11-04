"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSchema, CheckoutPayload } from "@/lib/checkout";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutPayload>({
    resolver: zodResolver(CheckoutSchema)
  });

  const onSubmit = async (data: CheckoutPayload) => {
    setServerError(null);
    if (loading) return; // prevent duplicate
    setLoading(true);

    try {
      const res = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Order failed");

      // persist last order to localStorage for confirmation page
      localStorage.setItem("lastOrder", JSON.stringify({ id: json.orderId, ...data }));
      router.push("/order-confirmation");
    } catch (err: any) {
      setServerError(err.message || "Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <fieldset className="col-span-1 lg:col-span-1 border rounded p-4">
          <legend className="px-2 font-semibold">Billing & Shipping</legend>

          <label className="block mt-3">
            <span className="text-sm">Full name</span>
            <input {...register("customer.name")} className="mt-1 w-full p-2 border rounded" />
            {errors.customer?.name && <div className="text-red-600 text-sm">{errors.customer.name.message}</div>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Email</span>
            <input {...register("customer.email")} className="mt-1 w-full p-2 border rounded" />
            {errors.customer?.email && <div className="text-red-600 text-sm">{errors.customer.email.message}</div>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Phone</span>
            <input {...register("customer.phone")} className="mt-1 w-full p-2 border rounded" />
            {errors.customer?.phone && <div className="text-red-600 text-sm">{errors.customer.phone.message}</div>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Address</span>
            <input {...register("shipping.address")} className="mt-1 w-full p-2 border rounded" />
            {errors.shipping?.address && <div className="text-red-600 text-sm">{errors.shipping.address.message}</div>}
          </label>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <label>
              <span className="text-sm">ZIP</span>
              <input {...register("shipping.zip")} className="mt-1 w-full p-2 border rounded" />
              {errors.shipping?.zip && <div className="text-red-600 text-sm">{errors.shipping.zip.message}</div>}
            </label>
            <label>
              <span className="text-sm">City</span>
              <input {...register("shipping.city")} className="mt-1 w-full p-2 border rounded" />
              {errors.shipping?.city && <div className="text-red-600 text-sm">{errors.shipping.city.message}</div>}
            </label>
          </div>

          <label className="block mt-3">
            <span className="text-sm">Country</span>
            <input {...register("shipping.country")} className="mt-1 w-full p-2 border rounded" />
            {errors.shipping?.country && <div className="text-red-600 text-sm">{errors.shipping.country.message}</div>}
          </label>
        </fieldset>

        <fieldset className="col-span-1 border rounded p-4">
          <legend className="px-2 font-semibold">Payment & Summary</legend>

          <div className="mt-3">
            <label className="flex items-center gap-3">
              <input type="radio" value="e-money" {...register("payment.method")} defaultChecked />
              <span>e-Money</span>
            </label>
            <label className="flex items-center gap-3 mt-2">
              <input type="radio" value="cod" {...register("payment.method")} />
              <span>Cash on Delivery</span>
            </label>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <input {...register("payment.emoneyNumber")} placeholder="e-Money Number" className="p-2 border rounded" />
              <input {...register("payment.emoneyPin")} placeholder="e-Money PIN" className="p-2 border rounded" />
            </div>
          </div>

          {/* Summary / items: you will populate these client-side from your cart */}
          <div className="mt-6">
            <p className="text-sm text-gray-600">Summary (example):</p>
            {/* For production, compute totals from cart state and set them into hidden inputs before submit */}
            <input type="hidden" value="..." {...register("totals.subtotal" as any)} />
            <input type="hidden" value="..." {...register("totals.shipping" as any)} />
            <input type="hidden" value="..." {...register("totals.vat" as any)} />
            <input type="hidden" value="..." {...register("totals.grandTotal" as any)} />
            <input type="hidden" value='[]' {...register("items" as any)} />
          </div>

          <div className="mt-6">
            <button type="submit" disabled={loading} className="w-full px-4 py-3 bg-orange-500 text-white rounded">
              {loading ? "Processing..." : "Continue & Pay"}
            </button>
            {serverError && <div className="text-red-600 mt-2 text-sm">{serverError}</div>}
          </div>
        </fieldset>
      </form>
    </main>
  );
}
