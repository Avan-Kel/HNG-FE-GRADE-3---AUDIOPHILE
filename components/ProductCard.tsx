import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  isNew?: boolean;
  href: string;
}

export default function ProductCard({ title, description, image, reverse, isNew, href }: ProductCardProps) {
  return (
    <section className={`flex ${reverse ? "flex-row-reverse" : ""} items-center justify-between gap-20 my-20`}>
      <div className="w-1/2">
        <Image src={image} alt={title} width={500} height={500} className="rounded-lg" />
      </div>
      <div className="w-1/2 space-y-4">
        {isNew && <p className="text-orange tracking-[10px] uppercase text-sm">New Product</p>}
        <h2 className="text-3xl font-bold uppercase">{title}</h2>
        <p className="text-gray-500">{description}</p>
        <Link
          href={href}
          className="bg-orange text-black px-6 py-3 inline-block text-sm tracking-wider uppercase"
        >
          See Product
        </Link>
      </div>
    </section>
  );
}
