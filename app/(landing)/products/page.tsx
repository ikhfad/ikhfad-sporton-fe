"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllCategories } from "@/app/services/category.service";
import { getAllProducts } from "@/app/services/product.service";
import { Category, Product } from "@/app/types";
import ProductCard from "../components/ui/product-card";
import PageHeader from "../components/ui/page-header";
import { FiFilter, FiX } from "react-icons/fi";

type SortOption = "default" | "price-low" | "price-high";

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all",
  );
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getAllCategories(),
          getAllProducts(),
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category._id === selectedCategory,
      );
    }

    // Sort by price
    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortOption]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Mobile Filter Toggle */}
      <button
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FiFilter />
        <span>Filters</span>
      </button>

      {/* Sidebar Filters */}
      <aside
        className={`
          lg:w-64 shrink-0
          ${isFilterOpen ? "block" : "hidden lg:block"}
        `}
      >
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-5 sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base md:text-lg">Filters</h3>
            <button
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
              onClick={() => setIsFilterOpen(false)}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-3">Category</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="accent-primary"
                />
                <span className="text-sm">All Categories</span>
              </label>
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category._id}
                    checked={selectedCategory === category._id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="accent-primary"
                  />
                  <span className="text-sm">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Sort */}
          <div>
            <h4 className="font-medium text-sm mb-3">Sort by Price</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value="default"
                  checked={sortOption === "default"}
                  onChange={() => setSortOption("default")}
                  className="accent-primary"
                />
                <span className="text-sm">Default</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortOption === "price-low"}
                  onChange={() => setSortOption("price-low")}
                  className="accent-primary"
                />
                <span className="text-sm">Low to High</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortOption === "price-high"}
                  onChange={() => setSortOption("price-high")}
                  className="accent-primary"
                />
                <span className="text-sm">High to Low</span>
              </label>
            </div>
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredProducts.length}</span>{" "}
            products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-500 text-sm md:text-base">
              No products found matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSortOption("default");
              }}
              className="mt-4 text-primary hover:underline text-sm md:text-base"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <main>
      <div className="container min-h-screen mx-auto px-4 sm:px-6 pt-30 xl:pt-35 pb-16 md:pb-20 lg:pb-16">
        <PageHeader
          title="Explore Products"
          subtitle="Discover our premium sportswear collection designed for athletes"
        />

        <Suspense
          fallback={
            <div className="text-center py-20">
              <p className="text-gray-500">Loading products...</p>
            </div>
          }
        >
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
};

export default function ProductsPageWrapper() {
  return (
    <Suspense
      fallback={
        <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center p-4">
          <div className="max-w-136 w-full bg-white rounded-xl py-12 px-6 sm:px-12 md:px-18">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-500 text-sm font-medium animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}
