import products from "../data/products.json";

// --- Types ---
export interface Product {
  slug: string;
  name: string;
  description?: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// --- Product fetch functions ---
export function getHeadphoneBySlug(slug: string): Product | undefined {
  return products.headphones.find((p) => p.slug === slug);
}

export function getSpeakerBySlug(slug: string): Product | undefined {
  return products.speakers.find((p) => p.slug === slug);
}

export function getEarphoneBySlug(slug: string): Product | undefined {
  return products.earphones.find((p) => p.slug === slug);
}

// --- Cart functions (using localStorage) ---
export function addToCart(product: Product): void {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find((p) => p.slug === product.slug);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function clearCart(): void {
  localStorage.removeItem("cart");
}
