import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryLinks from "@/components/CategoryLinks";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function SpeakerPage() {
  return (
    <main>

      <Navbar />
      <header className="bg-black text-white text-center py-20 uppercase tracking-widest text-3xl">
        ZX9 SPEAKER
      </header>

 
       <div className="max-w-6xl mx-auto px-8">
         <ProductCard
           title="XX99 Mark II Headphones"
           description="The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience..."
           image="/images/xx99-mark-2.png"
           isNew
           href="/products/headphones/xx99-mark-two"
         />
         <section className="px-6 md:px-24 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
           <div className="space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold uppercase">
               Features
             </h2>
             <p className="opacity-70 leading-relaxed">
               Located at the heart of New York City, Audiophile is the premier
               store for high-end headphones, earphones, speakers, and audio
               accessories. We have a large showroom and luxury demonstration
               rooms available for you to browse and experience a wide range of
               our products. Stop by our store to meet some of the fantastic
               people who make Audiophile the best place to buy your portable
               audio equipment.
             </p>
           </div>
 
           <div className="space-y-6">
             <h2 className="text-3xl md:text-4xl font-bold uppercase">
               Bringing you the <span className="text-[#D87D4A]">best</span>{" "}
               audio gear
             </h2>
             <p className="opacity-70 leading-relaxed">
               Located at the heart of New York City, Audiophile is the premier
               store for high-end headphones, earphones, speakers, and audio
               accessories. We have a large showroom and luxury demonstration
               rooms available for you to browse and experience a wide range of
               our products. Stop by our store to meet some of the fantastic
               people who make Audiophile the best place to buy your portable
               audio equipment.
             </p>
           </div>
         </section>
 
         <div className="space-y-6 flex">
           <Image
             src="/assets/branding-story.jpg"
             alt="Audiophile Store"
             width={600}
             height={400}
             className="rounded-2xl w-full h-80 md:h-full object-cover"
           />
           <Image
             src="/assets/branding-story.jpg"
             alt="Audiophile Store"
             width={600}
             height={400}
             className="rounded-2xl w-full h-80 md:h-full object-cover"
           />
         </div>
       </div>
 
       <CategoryLinks />
 
       <CategoryLinks />
 
       <section className="px-6 md:px-24 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
         <div className="space-y-6">
           <h2 className="text-3xl md:text-4xl font-bold uppercase">
             Bringing you the <span className="text-[#D87D4A]">best</span> audio
             gear
           </h2>
           <p className="opacity-70 leading-relaxed">
             Located at the heart of New York City, Audiophile is the premier
             store for high-end headphones, earphones, speakers, and audio
             accessories. We have a large showroom and luxury demonstration rooms
             available for you to browse and experience a wide range of our
             products. Stop by our store to meet some of the fantastic people who
             make Audiophile the best place to buy your portable audio equipment.
           </p>
         </div>
 
         <Image
           src="/assets/branding-story.jpg"
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
