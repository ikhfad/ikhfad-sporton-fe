import { Transaction } from "@/app/types";
import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

type TTransactionTableProps = {
  onViewDetails: (transaction: Transaction) => void;
  transaction: Transaction[];
};

const TransactionTable = ({
  onViewDetails,
  transaction,
}: TTransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      case "paid":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-xl border-gray-200">
      {/* Desktop Table View */}
      <table className="w-full text-left border-collapse hidden lg:table">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-4 font-semibold">Date</th>
            <th className="px-4 py-4 font-semibold">Customer</th>
            <th className="px-4 py-4 font-semibold">Contact</th>
            <th className="px-4 py-4 font-semibold">Total</th>
            <th className="px-4 py-4 font-semibold">Status</th>
            <th className="px-4 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
            >
              <td className="px-4 py-4 font-medium">
                {new Date(data.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-4 py-4 font-medium truncate max-w-37.5">
                {data.customerName}
              </td>
              <td className="px-4 py-4 font-medium">{data.customerContact}</td>
              <td className="px-4 py-4 font-medium">
                {priceFormatter(parseInt(data.totalPayment))}
              </td>
              <td className="px-4 py-4 font-medium">
                <div
                  className={`px-3 py-1 rounded-full border w-fit text-xs ${getStatusColor(
                    data.status,
                  )}`}
                >
                  {data.status}
                </div>
              </td>
              <td className="px-4 py-4 font-medium text-gray-600">
                <button
                  className="px-3 py-1.5 w-fit flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
                  onClick={() => onViewDetails(data)}
                >
                  <FiEye size={16} />
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {transaction.map((data) => (
          <div
            key={data._id}
            className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50"
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <span className="text-sm md:text-base text-gray-500">
                  {new Date(data.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div
                  className={`px-2 py-1 rounded-full border text-xs ${getStatusColor(
                    data.status,
                  )}`}
                >
                  {data.status}
                </div>
              </div>
              <div className="font-medium text-sm md:text-base">
                {data.customerName}
              </div>
              <div className="text-xs text-gray-500">
                {data.customerContact}
              </div>
              <div className="font-medium text-sm md:text-base text-primary mt-1">
                {priceFormatter(parseInt(data.totalPayment))}
              </div>
              <button
                className="mt-2 px-3 py-1.5 w-fit flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
                onClick={() => onViewDetails(data)}
              >
                <FiEye size={16} />
                <span className="text-sm md:text-base">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
