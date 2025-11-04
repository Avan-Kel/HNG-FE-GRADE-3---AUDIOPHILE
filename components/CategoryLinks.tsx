import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Headphones", image: "/images/headphones.png", href: "/headphones" },
  { name: "Speakers", image: "/images/speakers.png", href: "/speakers" },
  { name: "Earphones", image: "/images/earphones.png", href: "/earphones" },
];

export default function CategoryLinks() {
  return (
    <div className="flex justify-between my-32">
      {categories.map((c) => (
        <div key={c.name} className="bg-lightGray rounded-lg text-center py-10 w-[30%]">
          <Image src={c.image} alt={c.name} width={150} height={150} className="mx-auto" />
          <h3 className="uppercase font-semibold mt-4">{c.name}</h3>
          <Link href={c.href} className="text-gray-500 text-sm mt-2 inline-block">
            Shop →
          </Link>
        </div>
      ))}
    </div>
  );
}
