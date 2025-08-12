"use client"
import Link from 'next/link';
import Image from 'next/image';
import { LuShoppingCart, LuHeart, LuStar } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/utils/types';
import { addCart } from '@/utils/cart';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  delay: number | null
}

export default function ProductCard({ product,delay }: ProductCardProps) {

  const detail = product.detail as any;
  const imageUrl = "/cycle/rockrider.jpg";
  const brand = detail?.brand || '';
  const inStock = detail?.in_stock !== false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addCart(product.uid);
    toast.success(`${product.name} ${product.uid} added to cart!`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="gradient-card rounded-2xl overflow-hidden card-hover group border-accent border-[1px] " data-aos="fade-up" data-aos-delay={delay}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-black/70 rounded-full hover:bg-black/90">
              <LuHeart className="w-4 h-4 text-white" />
            </button>
          </div>
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.category.replace('-', ' ').toUpperCase()}
            </Badge>
            <span className="text-xs text-gray-400">{brand}</span>
          </div>
          
          <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-gray-200">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <LuStar key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="text-xs text-gray-400 ml-1">(4.9)</span>
          </div>
          
          {product.description && (
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              {inStock && (
                <span className="text-xs text-gray-400">
                  {product.stock} in stock
                </span>
              )}
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="gradient-button hover:gradient-button disabled:opacity-50 rounded-lg"
            >
              <LuShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}