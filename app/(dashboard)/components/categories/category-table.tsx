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
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-5 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={getImageUrl(data.imageUrl)}
                      width={52}
                      height={52}
                      alt={data.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 font-medium">{data.description}</td>
              <td className="px-5 py-4 font-medium text-gray-600">
                <div className="flex gap-5 items-center">
                  <button
                    className="hover:text-primary cursor-pointer"
                    onClick={() => onEdit?.(data)}
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    className="hover:text-primary cursor-pointer"
                    onClick={() => onDelete?.(data._id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
