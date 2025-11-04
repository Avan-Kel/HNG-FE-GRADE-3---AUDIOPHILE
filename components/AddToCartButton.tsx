"use client";

import { useState } from "react";
import { addToCart, Product } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`px-6 py-3 text-white font-bold rounded-lg ${
        added ? "bg-green-500" : "bg-black"
      }`}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
