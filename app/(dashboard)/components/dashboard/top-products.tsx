"use client";

import Link from "next/link";
import { FiArrowRight, FiTrendingUp } from "react-icons/fi";
import { Transaction } from "@/app/types";
import Image from "next/image";
import { getImageUrl } from "@/app/lib/api";
import { formatDashboardCurrencyNumber } from "@/app/utils/price-formatter";

interface TopProductsProps {
  transactions: Transaction[];
}

interface ProductSales {
  id: string;
  name: string;
  imageUrl: string;
  totalSold: number;
  revenue: number;
}

const TopProducts = ({ transactions }: TopProductsProps) => {
  // Aggregate product sales from transactions
  const productSalesMap = new Map<string, ProductSales>();

  transactions.forEach((transaction) => {
    if (transaction.status === "paid") {
      transaction.purchasedItems.forEach((item) => {
        const productId = item.productId._id;
        const existing = productSalesMap.get(productId);

        if (existing) {
          existing.totalSold += item.qty;
          existing.revenue += item.productId.price * item.qty;
        } else {
          productSalesMap.set(productId, {
            id: productId,
            name: item.productId.name,
            imageUrl: item.productId.imageUrl,
            totalSold: item.qty,
            revenue: item.productId.price * item.qty,
          });
        }
      });
    }
  });

  // Sort by total sold and take top 5
  const topProducts = Array.from(productSalesMap.values())
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  const maxSold = topProducts.length > 0 ? topProducts[0].totalSold : 0;

  if (topProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-green-500" />
            <h2 className="font-semibold text-lg">Top Selling Products</h2>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No sales data available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-green-500" />
          <h2 className="font-semibold text-lg">Top Selling Products</h2>
        </div>
        <Link
          href="/admin/transactions"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3">
            {/* Rank */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                index === 0
                  ? "bg-yellow-100 text-yellow-700"
                  : index === 1
                    ? "bg-gray-100 text-gray-600"
                    : index === 2
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-50 text-gray-500"
              }`}
            >
              {index + 1}
            </div>

            {/* Product Image */}
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

            {/* Product Info & Bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-dark truncate pr-2">
                  {product.name}
                </p>
                <span className="text-xs text-gray-500 shrink-0">
                  {product.totalSold} sold
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${(product.totalSold / maxSold) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Revenue */}
            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-sm font-semibold text-dark">
                {formatDashboardCurrencyNumber(product.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/products"
        className="flex items-center justify-center gap-2 mt-4 text-sm text-primary hover:underline"
      >
        <span>View All Products</span>
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default TopProducts;
