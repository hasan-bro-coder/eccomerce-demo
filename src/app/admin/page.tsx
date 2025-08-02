import Admin from "@/components/AdminComponent";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  let { data: product, error: dataError } = await supabase
    .from("products")
    .select("*");
  const server = await createClient();
  const { data, error } = await server.auth.getUser();

  if (error || !data?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background ">
        <h1 className="text-3xl font-bold text-white mb-4">
          You don't have access to this site
        </h1>
        <Link href="/login">
          <Button className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/80 transition">
            Login
          </Button>
        </Link>
      </div>
    );
  }
  return <Admin products={product || []}></Admin>;
}
