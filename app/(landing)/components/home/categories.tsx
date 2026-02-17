import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Category } from "@/app/types";
import CategoryCard from "../ui/category-card";

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
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
