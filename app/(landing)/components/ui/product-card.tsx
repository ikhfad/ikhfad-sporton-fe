"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { FiPlus } from "react-icons/fi";
import priceFormatter from "@/app/utils/price-formatter";
import { Product } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { useCartStore } from "@/app/hooks/use-cart-store";

type TProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: TProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      href={`/product/${product._id}`}
      className="p-1.5 bg-white hover:drop-shadow-xl duration-300 rounded-lg"
    >
      <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative rounded-t-lg">
        <Image
          src={getImageUrl(product.imageUrl)}
          alt={product.name}
          width={200}
          height={200}
          className="aspect-square object-contain p-3 md:p-4"
          loading="lazy"
        />
        <Button
          className="w-11 h-11 p-2! absolute right-2 top-2 md:right-3 md:top-3 min-h-11"
          variant={"primary"}
          size={"small"}
          onClick={handleAddToCart}
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
  );
};

export default ProductCard;
