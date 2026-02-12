"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";
import { FiPlus } from "react-icons/fi";
import priceFormatter from "@/app/utils/price-formatter";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";

type TProductProps = {
  products: Product[];
};

const ProductsSection = ({ products }: TProductProps) => {
  const { addItem } = useCartStore();
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <section
      id="products-section"
      className="container mx-auto px-4 sm:px-6 py-16 md:py-20 lg:py-24 xl:py-32"
    >
      <h2 className="font-bold italic text-2xl md:text-3xl lg:text-4xl text-center mb-8 md:mb-11">
        <span className="text-primary">OUR </span>PRODUCTS
      </h2>

      {/* Products Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols small laptop, 4 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="p-1.5 bg-white hover:drop-shadow-xl duration-300"
          >
            <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
              <Image
                src={getImageUrl(product.imageUrl)}
                alt={product.name}
                width={200}
                height={200}
                className="aspect-square object-contain p-3 md:p-4"
                loading="lazy"
              />
              <Button
                className="w-10 h-10 p-2! absolute right-2 top-2 md:right-3 md:top-3"
                variant={"primary"}
                size={"small"}
                onClick={(e) => handleAddToCart(e, product)}
                aria-label={`Add ${product.name} to cart`}
              >
                <FiPlus size={18} className="md:w-6 md:h-6" />
              </Button>
            </div>
            <h3 className="font-medium text-sm md:text-lg mb-1.5 mt-3 md:mt-4 px-1">
              {product.name}
            </h3>
            <div className="flex justify-between items-center mb-6 md:mb-8 px-1">
              <div className="text-xs md:text-gray-500 truncate max-w-30 md:max-w-none">
                {product.category.name}
              </div>
              <div className="font-medium text-sm md:text-base text-primary whitespace-nowrap">
                {priceFormatter(product.price)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
