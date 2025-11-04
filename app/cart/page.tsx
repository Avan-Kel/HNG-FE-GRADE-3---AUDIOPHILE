"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItemRow from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const items = useQuery(api.cart.getCart);
  const changeQty = useMutation(api.cart.setQuantity);
  const remove = useMutation(api.cart.removeItem);
  const clearCart = useMutation(api.cart.clear);

  const handleQty = (slug: string, qty: number) => {
    changeQty({ slug, quantity: qty });
  };

  const handleRemove = (slug: string) => {
    remove({ slug });
  };

  const subtotal = items?.reduce((acc, it) => acc + it.price * it.quantity, 0) ?? 0;
  const shipping = items?.length ? 50 : 0;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + vat;

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Cart</h1>

        {!items || items.length === 0 ? (
          <div className="text-center py-20">
            <p className="mb-4">Your cart is empty.</p>
            <Link href="/" className="px-6 py-2 bg-orange-500 text-white rounded">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <CartItemRow 
                  key={item.slug} 
                  item={item}
                  onQuantityChange={handleQty}
                  onRemove={handleRemove}
                />
              ))}

              <div className="flex justify-between items-center">
                <button onClick={() => clearCart()} className="text-sm text-red-500">Clear cart</button>
                <Link href="/checkout" className="px-6 py-3 bg-black text-white rounded">Checkout</Link>
              </div>
            </div>

            <aside className="bg-gray-50 rounded p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between mt-2"><span>Shipping</span><span>${shipping}</span></div>
              <div className="flex justify-between mt-2"><span>VAT</span><span>${vat.toLocaleString()}</span></div>
              <div className="flex justify-between mt-4 font-bold text-lg"><span>Total</span><span>${grandTotal.toLocaleString()}</span></div>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
