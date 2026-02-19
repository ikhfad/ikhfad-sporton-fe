import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

type TProductTableProps = {
  products: Product[];
  onDelete?: (id: string) => void;
  onEdit?: (product: Product) => void;
};

const ProductTable = ({ products, onDelete, onEdit }: TProductTableProps) => {
  return (
    <div className="bg-white rounded-xl border-gray-200">
      {/* Desktop Table View */}
      <table className="w-full text-left border-collapse hidden xl:table">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-4 font-semibold">Product</th>
            <th className="px-4 py-4 font-semibold">Category</th>
            <th className="px-4 py-4 font-semibold">Price</th>
            <th className="px-4 py-4 font-semibold">Stock</th>
            <th className="px-4 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((data) => (
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
                <div className="rounded-md bg-gray-200 px-3 py-1.5 w-fit">
                  {data.category.name}
                </div>
              </td>
              <td className="px-4 py-4 font-medium">
                {priceFormatter(data.price)}
              </td>
              <td className="px-4 py-4 font-medium">{data.stock}</td>
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
      <div className="xl:hidden">
        {products.map((data) => (
          <div
            key={data._id}
            className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 shrink-0"
          >
            <div className="flex gap-4 items-start">
              <div className="aspect-square bg-gray-100 rounded-md w-16 h-16 shrink-0">
                <Image
                  src={getImageUrl(data.imageUrl)}
                  width={52}
                  height={52}
                  alt={data.name}
                  className="aspect-square object-contain w-auto h-full"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm md:text-base truncate">
                  {data.name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="rounded-md bg-gray-200 px-2 py-1 text-xs">
                    {data.category.name}
                  </span>
                  <span className="text-sm md:text-base font-medium text-primary">
                    {priceFormatter(data.price)}
                  </span>
                  <span className="text-xs text-gray-500">
                    Stock: {data.stock}
                  </span>
                </div>
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

export default ProductTable;
