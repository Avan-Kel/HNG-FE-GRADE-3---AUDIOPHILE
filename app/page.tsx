import Image from "next/image";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <main className="w-full flex flex-col">
       <Navbar />

      {/* HERO */}
      <section className="bg-[#191919] text-white px-6 md:px-24 py-24 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-md space-y-6">
          <p className="tracking-[8px] text-gray-400 uppercase text-sm">
            New Product
          </p>

          <h1 className="text-4xl md:text-6xl font-bold uppercase leading-tight">
            XX99 Mark II<br/>Headphones
          </h1>

          <p className="opacity-80 leading-relaxed">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>

          <Link href="/products/headphones/xx99-mark-II">
            <button className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white px-8 py-3 uppercase tracking-wide">
              See Product
            </button>
          </Link>
        </div>

        <div className="mt-10 md:mt-0">
          <Image
            src="/assets/Bitmap-1.png"
            alt="XX99 Headphones"
            width={450}
            height={450}
            priority
          />
        </div>
      </section>


      {/* CATEGORY CARDS */}
      <section className="py-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-24">
        <CategoryCard 
          image="/assets/image-removebg-preview(41).png" 
          title="Headphones" 
         href="/products/headphones/xx99-mark-two"
        />
        <CategoryCard 
          image="/assets/image-removebg-preview(38).png" 
          title="Speakers" 
          href="/products/speakers"
        />
        <CategoryCard 
          image="/assets/image-removebg-preview(42).png" 
          title="Earphones" 
          href="/products/earphones"
        />
      </section>


      {/* ZX9 SPEAKER FEATURED */}
      <section className="px-6 md:px-24 mb-24">
        <div>
          <Image 
            src="/assets/Group 7.png" 
            alt="ZX9 Speaker" 
            width={250} 
            height={250}
            className="drop-shadow-xl mb-8 w-full py-24 px-10 text-center"
          />
        </div>
      </section>


      {/* ZX7 SPEAKER */}
      <section className="px-6 md:px-24 mb-24">
        <div className="rounded-2xl h-80 md:h-72 bg-[url('/assets/zx7-bg.jpg')] bg-cover bg-center flex items-center px-10 md:px-20">
          <Image 
            src="/assets/Group 17.png" 
            alt="ZX9 Speaker" 
            width={250} 
            height={250}
            className="drop-shadow-xl mb-8 w-full py-24 px-10 text-center"
          />
        </div>
      </section>


      {/* YX1 EARPHONES */}
      <section className="px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        <Image
          src="/assets/Group 12.png"
          alt="YX1 Earphones"
          width={300}
          height={400}
          className="rounded-2xl w-full h-64 md:h-full object-cover"
        />

        <Image
          src="/assets/Group 10.png"
          alt="YX1 Earphones"
          width={300}
          height={400}
          className="rounded-2xl w-full h-64 md:h-full object-cover"
        />
      </section>


      {/* BRANDING STORY */}
      <section className="px-6 md:px-24 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase">
            Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
          </h2>
          <p className="opacity-70 leading-relaxed">
            Located at the heart of New York City, Audiophile is the premier store for high-end headphones,
            earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our products. Stop by our store to meet
            some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>

        <Image
          src="/assets/Bitmap-2.png"
          alt="Audiophile Store"
          width={600}
          height={400}
          className="rounded-2xl w-full h-80 md:h-full object-cover"
        />
      </section>

      <Footer />

    </main>
  );
}
