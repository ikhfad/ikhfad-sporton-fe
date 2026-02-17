"use client";

import Link from "next/link";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { Product } from "@/app/types";
import Image from "next/image";
import { getImageUrl } from "@/app/lib/api";

interface LowStockAlertProps {
  products: Product[];
  threshold?: number;
}

const LowStockAlert = ({ products, threshold = 10 }: LowStockAlertProps) => {
  const lowStockProducts = products
    .filter((product) => product.stock < threshold)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  if (lowStockProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Low Stock Alerts</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">All products are well stocked!</p>
        </div>
      </div>
    );
  }

  const getStockColor = (stock: number): string => {
    if (stock <= 3) return "text-red-600 bg-red-50";
    if (stock <= 5) return "text-orange-600 bg-orange-50";
    return "text-yellow-600 bg-yellow-50";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiAlertTriangle className="text-yellow-500" />
          <h2 className="font-semibold text-lg">Low Stock Alerts</h2>
        </div>
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
          {lowStockProducts.length} items
        </span>
      </div>

      <div className="space-y-3">
        {lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="flex max-[400px]:flex-col flex-row items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex max-[400px]:mb-2 mb-0 items-center gap-3 max-[400px]:w-full shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                {product.imageUrl && (
                  <Image
                    width={52}
                    height={52}
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-dark line-clamp-1">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  {product.category?.name}
                </p>
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-md text-xs font-semibold max-[400px]:w-full shrink-0 ${getStockColor(
                product.stock,
              )}`}
            >
              {product.stock} left
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/products"
        className="flex items-center justify-center gap-2 mt-4 text-sm text-primary hover:underline"
      >
        <span>Manage Products</span>
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default LowStockAlert;
