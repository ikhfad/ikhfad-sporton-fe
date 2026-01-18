import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const categoryData = [
  {
    name: "Badminton",
    imageUrl: "/images/categories/category-badminton.png",
    description: "Premium rackets, high-speed shuttlecocks, and court shoes designed for agility and precision."
  },
  {
    name: "Basketball",
    imageUrl: "/images/categories/category-basketball.png",
    description: "High-grip basketballs, supportive high-top sneakers, and breathable jerseys for the court."
  },
  {
    name: "Football",
    imageUrl: "/images/categories/category-football.png",
    description: "Professional cleats, durable footballs, and protective gear for players of all levels."
  },
  {
    name: "Running",
    imageUrl: "/images/categories/category-running.png",
    description: "Advanced footwear and moisture-wicking apparel engineered for maximum comfort and endurance."
  },
  {
    name: "Swimming",
    imageUrl: "/images/categories/category-swimming.png",
    description: "Hydrodynamic swimwear, anti-fog goggles, and essential training equipment for the pool or open water."
  },
  {
    name: "Tennis",
    imageUrl: "/images/categories/category-tennis.png",
    description: "High-performance rackets, pressurized tennis balls, and specialized footwear for superior court control."
  }
]

const CategoryTable = () => {
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
          {categoryData.map((data, index) => (
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
              <td className="px-5 py-4 font-medium">{data.description}</td>
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

export default CategoryTable;
