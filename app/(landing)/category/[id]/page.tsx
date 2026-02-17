import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getCategoryById } from "@/app/services/category.service";
import { getProductsByCategory } from "@/app/services/product.service";
import { getImageUrl } from "@/app/lib/api";
import ProductCard from "../../components/ui/product-card";

export type TCategoryPageProps = {
  params: Promise<{ id: string }>;
};

const CategoryDetailPage = async ({ params }: TCategoryPageProps) => {
  const { id } = await params;
  const [category, products] = await Promise.all([
    getCategoryById(id),
    getProductsByCategory(id),
  ]);

  return (
    <main>
      <div className="container min-h-screen mx-auto sm:px-6 pt-30 xl:pt-35 pb-16 md:pb-20 lg:pb-16">
        {/* Back Link */}
        <Link
          href="/category"
          className="inline-flex items-center gap-2 text-sm md:text-base text-gray-600 hover:text-primary transition-colors mb-6 md:mb-8"
        >
          <FiArrowLeft />
          <span>Back to Categories</span>
        </Link>

        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mb-10 md:mb-14">
          <div className="bg-primary-light rounded-xl p-6 md:p-8 flex items-center justify-center">
            <Image
              src={getImageUrl(category.imageUrl)}
              alt={category.name}
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              {category.name}
            </h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
              {category.description ||
                `Discover our premium ${category.name.toLowerCase()} sportswear collection, designed for athletes who demand the best in comfort, durability, and performance.`}
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="font-bold text-xl md:text-2xl mb-6 md:mb-8">
            Products in {category.name}
            <span className="text-gray-400 font-normal text-base md:text-lg ml-2">
              ({products.length} items)
            </span>
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20">
              <p className="text-gray-500 text-sm md:text-base">
                No products available in this category yet.
              </p>
              <Link
                href="/products"
                className="inline-block mt-4 text-primary hover:underline text-sm md:text-base"
              >
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryDetailPage;
