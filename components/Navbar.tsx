"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart, CartItem } from "@/lib/utils";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const cartItems: CartItem[] = getCart();
    const count: number = cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0,
    );
    setCartCount(count);
  }, []);

  return (
    <header className="w-full bg-black text-white fixed top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <h2 className="text-white">audiophile </h2>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex-1 flex justify-center space-x-8 hidden md:flex">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link
            href="/products/headphones"
            className="hover:text-orange-500 transition-colors"
          >
            Headphones
          </Link>
          <Link
            href="/products/speakers"
            className="hover:text-orange-500 transition-colors"
          >
            Speakers
          </Link>
          <Link
            href="/products/earphones"
            className="hover:text-orange-500 transition-colors"
          >
            Earphones
          </Link>
        </nav>

        {/* Right: Cart Icon */}
        <div className="flex-shrink-0">
          <Link href="/cart" className="relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-4" onClick={toggleMobile}>
          {mobileOpen ? (
            <span className="text-3xl">&#10005;</span>
          ) : (
            <span className="text-3xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-black w-full px-4 pb-4 space-y-2 text-white">
          <Link
            href="/"
            className="block py-2 hover:text-orange-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products/headphones/[slug]/page.tsx"
            className="block py-2 hover:text-orange-500 transition-colors"
          >
            Headphones
          </Link>
          <Link
            href="/products/speakers"
            className="block py-2 hover:text-orange-500 transition-colors"
          >
            Speakers
          </Link>
          <Link
            href="/products/earphones"
            className="block py-2 hover:text-orange-500 transition-colors"
          >
            Earphones
          </Link>
          <Link
            href="/cart"
            className="block py-2 relative hover:text-orange-500 transition-colors"
          >
            Cart{" "}
            {cartCount > 0 && (
              <span className="ml-1 bg-orange-500 rounded-full px-2 text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
}
