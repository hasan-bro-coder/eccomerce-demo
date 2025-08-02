import ProductDetailPage from "@/components/product/ProductDetailPage";
import { defaultProduct } from "@/utils/data";
import { supabase } from "@/utils/supabase/client";


export default async function Prp({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params
  let { data: productData, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id));
  let { data: relatedProductsData, error: relatedProductsError } =
    await supabase
      .from("products")
      .select("*")
      .eq("category", productData?.[0]?.category || "other")
      .neq("id", Number(id));
  
  return (
    <ProductDetailPage
      product={productData?.[0] || defaultProduct()}
      relatedProducts={relatedProductsData || []}
    ></ProductDetailPage>
  );
}
