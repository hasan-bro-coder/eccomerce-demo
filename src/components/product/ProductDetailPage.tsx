"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Share2, Star, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/product/ProductCard';
import { addCart} from '@/utils/cart';
import { toast } from 'sonner';
import { Product } from '@/utils/types';



export default function ProductDetailPage({ product,relatedProducts }: { product: Product,relatedProducts: Product[] }) {

  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Initialize products
  // useEffect(() => {
  //   if (products.length === 0) {
  //     setProducts(mockProducts);
  //   }
  // }, [products.length, setProducts]);

  // const product = getProductById(productId);
  // const relatedProducts = products
  //   .filter(p => p.category === product?.category && p.id !== productId)
  //   .slice(0, 4);



  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-accent-foreground mb-4">Product Not Found</h1>
          <p className="text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addCart(product.uid, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
              <Image
                src={product.image[selectedImage] || "/default.png"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {product.image.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.image.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.category.replace('-', ' ').toUpperCase()}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-accent-foreground mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-400 text-sm ml-2">(4.9) • 127 reviews</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-white mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-white font-medium">Quantity:</label>
                <div className="flex items-center border border-accent rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-white min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock == 0}
                  className="flex-1 bg-white text-gray-950 hover:bg-gray-200 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" className="border-accent text-white hover:bg-gray-800">
                  <Heart className="w-4 h-4" />
                </Button>
                
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background">
              <TabsTrigger value="specs" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="description" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-white data-[state=active]:text-black">
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="mt-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.detail && typeof product.detail === 'object'
                    ? Object.entries(product.detail).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-white/10">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-white font-medium">
                            {typeof value === 'object' && value !== null
                              ? JSON.stringify(value)
                              : String(value)}
                          </span>
                        </div>
                      ))
                    : <div className="text-gray-400">No specifications available.</div>
                  }
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Product Description</h3>
                <div className="text-gray-300 space-y-4">
                  <p>{product.description}</p>
                  
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-background rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Mock Reviews */}
                  <div className="border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-medium">John D.</span>
                      <span className="text-gray-400 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-300">
                      Excellent quality and performance. Easy to install and works perfectly. 
                      Highly recommended for anyone looking to upgrade their setup.
                    </p>
                  </div>
                  
                  <div className="border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-medium">Sarah M.</span>
                      <span className="text-gray-400 text-sm">Verified Purchase</span>
                    </div>
                    <p className="text-gray-300">
                      Great product! Noticeable improvement in performance. Fast shipping and 
                      excellent customer service.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product,idx) => (
                <ProductCard key={product.id} product={product} delay={idx * 100}/>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}