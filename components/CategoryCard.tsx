import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  href: string;
}

export default function CategoryCard({ image, title, href }: Props) {
  return (
    <div className="bg-[#F1F1F1] rounded-lg flex flex-col items-center py-10">
      <Image src={image} alt={title} width={120} height={120} />
      <h3 className="mt-4 text-lg font-bold uppercase">{title}</h3>

      <Link href={href} className="mt-2 text-gray-600 font-medium uppercase tracking-wider hover:text-[#D87D4A]">
        Shop ➜
      </Link>
    </div>
  );
}
