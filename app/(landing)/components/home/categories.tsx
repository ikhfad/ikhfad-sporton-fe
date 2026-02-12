import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TCategoriesProps = {
  categories: Category[];
};

const CategoriesSection = ({ categories }: TCategoriesProps) => {
  return (
    <section
      id="category-section"
      className="container mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h2 className="font-bold text-xl md:text-2xl">Browse By Categories</h2>
        <Link
          href="#"
          className="flex gap-2 text-primary font-medium text-sm md:text-base py-2"
        >
          <span className="self-center">See All Categories</span>
          <FiArrowRight className="self-center" />
        </Link>
      </div>

      {/* Categories Grid - Responsive: 2 cols mobile, 3 cols tablet, 4 cols small laptop, 6 cols desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
        {categories.map((category) => (
          <div
            className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center items-center p-3 md:p-4"
            key={category._id}
          >
            <div className="self-center text-center">
              <Image
                src={getImageUrl(category.imageUrl)}
                width={60}
                height={60}
                alt={category.name}
                className="mb-2 md:mb-2.5 w-12.5 h-12.5 md:w-17.5 md:h-17.5 lg:w-21.5 lg:h-21.5 object-contain"
                loading="lazy"
              />
              <div className="text-primary font-medium text-xs md:text-sm lg:text-base">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
