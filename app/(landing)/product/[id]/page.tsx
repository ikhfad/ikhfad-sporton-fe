import Image from "next/image";
import ProductActions from "../../components/product-detail/product-action";
import priceFormatter from "@/app/utils/price-formatter";
import { getProductDetail } from "@/app/services/product.service";
import { getImageUrl } from "@/app/lib/api";

export type TPageProps = {
  params: Promise<{ id: string }>;
};

const ProductDetail = async ({ params }: TPageProps) => {
  const { id } = await params;
  const product = await getProductDetail(id);

  return (
    <main className="container mx-auto mt-5 md:mt-10 xl:mt-15 px-4 sm:px-6 py-16 md:py-20 xl:py-24 min-h-screen">
      <div className="flex flex-col xl:flex-row gap-6 md:gap-10 xl:gap-12 h-full">
        {/* Image Section */}
        <div className="w-full xl:w-1/2">
          <div className="bg-primary-light aspect-square flex justify-center items-center w-full max-w-sm sm:max-w-md md:max-w-lg xl:max-w-full mx-auto">
            <Image
              src={getImageUrl(product.imageUrl)}
              width={400}
              height={400}
              alt={product.name}
              className="aspect-square object-contain w-full h-full p-4 md:p-6 xl:p-8"
              priority
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full xl:w-1/2 xl:py-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl mb-4 md:mb-5 xl:mb-6">
            {product.name}
          </h1>
          <div className="bg-primary-light rounded-full text-primary py-1.5 px-4 md:py-2 md:px-6 w-fit mb-4 md:mb-5 text-sm md:text-base">
            {product.category.name}
          </div>
          <p className="leading-relaxed mb-6 text-sm md:text-base text-gray-600">
            {product.description}
          </p>
          <div className="text-primary text-xl sm:text-2xl md:text-[28px] xl:text-[32px] font-semibold mb-6 md:mb-8 xl:mb-12">
            {priceFormatter(product.price)}
          </div>
          <ProductActions product={product} stock={product.stock} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
