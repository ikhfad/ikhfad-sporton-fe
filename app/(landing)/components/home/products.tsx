"use client";

import { Product } from "@/app/types";
import ProductCard from "../ui/product-card";

type TProductProps = {
  products: Product[];
};

const ProductsSection = ({ products }: TProductProps) => {
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
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
