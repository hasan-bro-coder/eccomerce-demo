import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuStar } from "react-icons/lu";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CategoryBar from "@/components/CategoryBar";
import ProductFeatured from "@/components/product/ProductFeatured";

export default async function Home() {
  return (
    <>
      <main className="gradient-bg overflow-hidden  min-h-full h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Premium
                  <span className="block text-gray-300">Cycling Parts</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-md">
                  Upgrade your ride with our carefully curated selection of
                  high-performance cycling components from the world's leading
                  brands.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="gradient-button hover:gradient-button group rounded-xl"
                  >
                    Shop Now
                    <LuArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products?category=drivetrain">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    Browse Drivetrain
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              {/* <div className="flex space-x-8 pt-8">
              <div>
                <div className="text-2xl font-bold text-white">10k+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Premium Brands</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm text-gray-400">Satisfaction Rate</div>
              </div>
            </div>*/}
            </div>

            <div className="relative" data-aos="fade-up" data-aos-delay="400">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="/cycle/rockrider.jpg"
                  alt="Premium cycling components"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div
        className="w-screen h-full flex justify-center items-start my-20 "
        data-aos="fade-up"
      >
        <Carousel className="w-[80vw] sm:w-[70vw] lg:w-[60vw]">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex aspect-video items-center justify-center">
                  <img
                    src="/cycle/rockrider.jpg"
                    alt="Premium cycling components"
                    className="aspect-video object-cover rounded-2xl"
                  ></img>
                  {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious /> <CarouselNext />
        </Carousel>
      </div>
      
        
        <CategoryBar></CategoryBar>

      <ProductFeatured></ProductFeatured>
    </>
  );
}
