import { supabase } from "@/utils/supabase/client";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function ProductFeatured() {
  let { data, error } = await supabase.from("products").select("*");
  const featuredProducts = data?.splice(0, 16) || [];
  console.log(featuredProducts);
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Products
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our most popular cycling components, trusted by
            professionals and enthusiasts worldwide.
          </p>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          // data-aos="fade-up"
          // data-aos-delay="200"
        >
          {featuredProducts.map((product,idx) => (
            <ProductCard key={product.id} product={product} delay={idx*100}/>
          ))}
        </div>

        <div
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button
              size="lg"
              className="gradient-button hover:gradient-button rounded-xl"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
