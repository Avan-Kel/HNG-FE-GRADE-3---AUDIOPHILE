import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CategoryLinks from "@/components/CategoryLinks";
import Footer from "@/components/Footer";

export default function SpeakerPage() {
  return (
    <main>
      <Navbar />
      <header className="bg-black text-white text-center py-20 uppercase tracking-widest text-3xl">
        Speakers
      </header>

      <div className="max-w-6xl mx-auto px-8">
        <ProductCard
          title="XX99 Mark II Headphones"
          description="The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience..."
          image="/images/xx99-mark-2.png"
          isNew
          href="/products/headphones/yx1"
        />
        <ProductCard
          title="XX99 Mark I Headphones"
          description="As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate sound reproduction..."
          image="/images/xx99-mark-1.png"
          reverse
          href="/products/headphones/xx99-mark-one"
        />
        <CategoryLinks />
      </div>

      <Footer />
    </main>
  );
}
