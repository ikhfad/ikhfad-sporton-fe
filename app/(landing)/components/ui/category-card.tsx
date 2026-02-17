
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";

type TCategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: TCategoryCardProps) => {
  return (
    <Link
      href={`/category/${category._id}`}
      className="rounded-lg bg-linear-to-r from-[#F1F1F1] to-[#F7F7F7] w-full aspect-square flex justify-center items-center p-3 md:p-4 hover:shadow-md transition-shadow duration-300"
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
    </Link>
  );
};

export default CategoryCard;
