import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const productData = [
  {
    name: "SportOn SlowLivin",
    imageUrl: "/images/products/product-1.png",
    category: "Running",
    price: 289000,
    stock: 123,
  },
  {
    name: "SportOn Rocket Tennis",
    imageUrl: "/images/products/product-2.png",
    category: "Tennis",
    price: 990000,
    stock: 32,
  },
  {
    name: "SportOn Hyperfast Shoes",
    imageUrl: "/images/products/product-3.png",
    category: "Running",
    price: 600000,
    stock: 66,
  },
  {
    name: "SportOn HyperBlaze Shoes",
    imageUrl: "/images/products/product-4.png",
    category: "Football",
    price: 860000,
    stock: 96,
  },
  {
    name: "SportOn AeroFresh",
    imageUrl: "/images/products/product-5.png",
    category: "Running",
    price: 240000,
    stock: 56,
  },
  {
    name: "SportOn Basketball",
    imageUrl: "/images/products/product-6.png",
    category: "Basketball",
    price: 1200000,
    stock: 29,
  },
];

const ProductTable = () => {
  return (
    <div className="bg-white rounded-xl border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-5 py-4 font-medium">
                <div className="flex gap-2 items-center">
                  <div className="aspect-square bg-gray-100 rounded-md">
                    <Image
                      src={data.imageUrl}
                      width={52}
                      height={52}
                      alt={data.name}
                      className="aspect-square object-contain"
                    />
                  </div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 font-medium">
                <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                  {data.category}
                </div>
              </td>
              <td className="px-5 py-4 font-medium">
                {priceFormatter(data.price)}
              </td>
              <td className="px-5 py-4 font-medium">{data.stock}</td>
              <td className="px-5 py-4 font-medium text-gray-600">
                <div className="flex gap-5 items-center">
                  <button className="hover:text-primary">
                    <FiEdit2 size={20} />
                  </button>
                  <button className="hover:text-primary">
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

export default ProductTable;
