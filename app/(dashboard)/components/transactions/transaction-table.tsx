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
    }
  };
  return (
    <div className="bg-white rounded-xl border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contanct</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((data) => (
            <tr
              key={data._id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-5 py-4 font-medium">
                {new Date(data.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-5 py-4 font-medium">{data.customerName}</td>
              <td className="px-5 py-4 font-medium">{data.customerContact}</td>
              <td className="px-5 py-4 font-medium">
                {priceFormatter(parseInt(data.totalPayment))}
              </td>
              <td className="px-5 py-4 font-medium">
                <div
                  className={`px-4 py-1 rounded-full border w-fit text-sm ${getStatusColor(data.status)}`}
                >
                  {data.status}
                </div>
              </td>
              <td className="px-5 py-4 font-medium text-gray-600">
                <div className="flex gap-5 items-center">
                  <button
                    className="px-2 py-1 w-fit flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
                    onClick={() => onViewDetails(data)}
                  >
                    <FiEye size={18} />
                    View Details
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

export default TransactionTable;
