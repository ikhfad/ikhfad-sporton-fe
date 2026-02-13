import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TCategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
};

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}: TCategoryTableProps) => {
  return (
    <div className="bg-white rounded-xl border-gray-200">
      {/* Desktop Table View */}
      <table className="w-full text-left border-collapse hidden lg:table">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-4 font-semibold">Category Name</th>
            <th className="px-4 py-4 font-semibold">Description</th>
            <th className="px-4 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
            >
              <td className="px-4 py-4 font-medium">
                <div className="flex gap-3 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md w-12 h-12 shrink-0">
                    <Image
                      src={getImageUrl(data.imageUrl)}
                      width={52}
                      height={52}
                      alt={data.name}
                      className="aspect-square object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="truncate max-w-50">{data.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 font-medium">
                <span className="truncate max-w-75 inline-block">
                  {data.description}
                </span>
              </td>
              <td className="px-4 py-4 font-medium text-gray-600">
                <div className="flex gap-4 items-center">
                  <button
                    className="hover:text-primary cursor-pointer p-1 rounded"
                    onClick={() => onEdit?.(data)}
                    aria-label={`Edit ${data.name}`}
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="hover:text-primary cursor-pointer p-1 rounded"
                    onClick={() => onDelete?.(data._id)}
                    aria-label={`Delete ${data.name}`}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {categories.map((data) => (
          <div
            key={data._id}
            className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50"
          >
            <div className="flex gap-4 items-start">
              <div className="aspect-square bg-gray-100 rounded-md w-16 h-16 shrink-0">
                <Image
                  src={getImageUrl(data.imageUrl)}
                  width={52}
                  height={52}
                  alt={data.name}
                  className="aspect-square object-contain w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm md:text-base truncate">
                  {data.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">
                  {data.description}
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-4 ml-auto w-fit">
              <button
                className="hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                onClick={() => onEdit?.(data)}
                aria-label={`Edit ${data.name}`}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                onClick={() => onDelete?.(data._id)}
                aria-label={`Delete ${data.name}`}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
