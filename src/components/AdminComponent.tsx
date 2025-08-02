"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/utils/data";
import { toast } from "sonner";
import { Product, ProductIns } from "@/utils/types";
import { add, del, upd } from "@/app/admin/action";

export default function Admin({ products }: { products: Product[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    description: string | null;
    detail: string;
    image: string[];
    price: number;
    stock: number;
  }>({
    name: "",
    category: "",
    description: "",
    detail: "{}",
    image: [],
    price: 0.0,
    stock: 0,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      detail: "{}",
      image: [],
      price: 0.0,
      stock: 0,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      detail: JSON.stringify(product.detail || {}, null, 2),
      stock: product.stock,
    });
    setIsDialogOpen(true);
  };

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData: ProductIns = {
        name: formData.name,
        description: formData.description || null,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        detail: formData.detail,
        stock: formData.stock,
      };

      if (editingProduct) {
        await upd(editingProduct, productData);
        toast.success("Product updated successfully!");
        window.location.reload();
      } else {
        await add(productData);
        toast.success("Product added successfully!");
        window.location.reload();
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Invalid specs format. Please use valid JSON.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await del(Number(id));
      toast.success("Product deleted successfully!");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your cycling parts inventory</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background border border-accent rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white">
                  {products.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-background border border-accent rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Stock</p>
                <p className="text-2xl font-bold text-white">
                  {products.filter((p) => p.stock > 0).length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-background border border-accent rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-white">
                  {categories.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-background border border-accent rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. Price</p>
                <p className="text-2xl font-bold text-white">
                  $
                  {(
                    products.reduce((sum, p) => sum + p.price, 0) /
                      products.length || 0
                  ).toFixed(0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-background border border-accent rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-accent flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Products</h2>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={resetForm}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-background border-accent text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-background border-accent text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-white">
                        Price ($)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="1"
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: Number(e.target.value),
                          })
                        }
                        className="bg-background border-accent text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-white">
                        Category
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger className="bg-background border-accent text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-accent">
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat.id}
                              value={cat.id}
                              className="text-white"
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      required
                      value={formData.description || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="bg-background border-accent text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-white">
                      Main Image URL
                    </Label>
                    <Input
                      id="image"
                      required
                      value={JSON.stringify(formData.image)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: JSON.parse(e.target.value),
                        })
                      }
                      className="bg-background border-accent text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock" className="text-white">
                      Stock Quantity
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: Number(e.target.value),
                        })
                      }
                      className="bg-background border-accent text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specs" className="text-white">
                      Specifications (JSON)
                    </Label>
                    <Textarea
                      id="specs"
                      value={formData.detail}
                      onChange={(e) =>
                        setFormData({ ...formData, detail: e.target.value })
                      }
                      className="bg-background border-accent text-white font-mono"
                      rows={4}
                      placeholder='{"Speed": "12-speed", "Type": "Electronic"}'
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-accent text-white hover:bg-accent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-accent">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      {(() => {
                        const imageUrl = product.image;
                        return (
                          <div className="flex items-center space-x-3">
                            {imageUrl && (
                              <img
                                src={imageUrl[0]}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <div className="text-white font-medium">
                                {product.name}
                              </div>
                              {product.description && (
                                <div className="text-gray-400 text-sm truncate max-w-xs">
                                  {product.description}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {product.category.replace("-", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {(product.detail as any)?.brand || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-white">{product.stock}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          (product.detail as any)?.in_stock !== false
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {(product.detail as any)?.in_stock !== false
                          ? "In Stock"
                          : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(product)}
                          className="border-accent text-white hover:bg-accent"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(String(product.id))}
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
