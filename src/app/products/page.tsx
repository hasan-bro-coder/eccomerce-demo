import { ProductsContent } from "@/components/product/ProductSearch";
import { supabase } from "@/utils/supabase/client";

interface ProductsPageProps {
  searchParams: { [key: string]: string };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { category } = await searchParams;
  console.log(category);

  let { data: productData, error: productError } = category
    ? await supabase.from("products").select("*").eq("category", category)
    : await supabase.from("products").select("*");
  return <ProductsContent products={productData || []} />;
}
