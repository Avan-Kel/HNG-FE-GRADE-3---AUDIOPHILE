"use client";

import Image from "next/image";
import { CartItem } from "@/lib/utils";

interface Props {
  item: CartItem;
  onQuantityChange?: (slug: string, qty: number) => void;
  onRemove?: (slug: string) => void;
  showControls?: boolean;
}

export default function CartItemRow({ item, onQuantityChange, onRemove, showControls = true }: Props) {
  const handleChange = (delta: number) => {
    const next = Math.max(1, item.quantity + delta);
    onQuantityChange?.(item.slug, next);
  };

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      <div className="w-24 h-24 relative flex-shrink-0">
        <Image
          src={`/assets/${item.image}`}
          alt={item.name}
          fill
          sizes="96px"
          className="object-contain rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
      </div>

      <div className="w-40 flex items-center justify-end gap-4">
        {showControls ? (
          <>
            <div className="flex items-center border rounded overflow-hidden">
              <button
                onClick={() => handleChange(-1)}
                className="px-3 py-1 text-lg"
                aria-label="decrease"
              >−</button>
              <div className="px-3 py-1 min-w-[36px] text-center">{item.quantity}</div>
              <button
                onClick={() => handleChange(1)}
                className="px-3 py-1 text-lg"
                aria-label="increase"
              >+</button>
            </div>
            <div className="text-right w-24">
              <div className="font-medium">${(item.price * item.quantity).toLocaleString()}</div>
              <button onClick={() => onRemove?.(item.slug)} className="text-sm text-red-500 mt-1">Remove</button>
            </div>
          </>
        ) : (
          <div className="text-right w-36">
            <div className="font-medium">${(item.price * item.quantity).toLocaleString()}</div>
            <div className="text-sm text-gray-500">x{item.quantity}</div>
          </div>
        )}
      </div>
    </div>
  );
}
