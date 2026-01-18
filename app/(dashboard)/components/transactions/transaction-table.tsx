import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";

const transactionData = [
  {
    date: "23/02/2026 19:32",
    customer: "John Doe",
    contact: "08231223123",
    total: 450000,
    status: "PENDING"
  },
  {
    date: "23/02/2026 13:32",
    customer: "Delon Marx",
    contact: "08823291231",
    total: 753000,
    status: "PAID"
  },
  {
    date: "24/02/2026 09:15",
    customer: "Sarah Jenkins",
    contact: "08124455667",
    total: 1250000,
    status: "PAID"
  },
  {
    date: "24/02/2026 10:45",
    customer: "Michael Chen",
    contact: "08571122334",
    total: 89000,
    status: "REJECTED"
  },
  {
    date: "24/02/2026 14:20",
    customer: "Ahmad Subarjo",
    contact: "08138899001",
    total: 2300000,
    status: "PENDING"
  },
  {
    date: "25/02/2026 08:05",
    customer: "Amanda Putri",
    contact: "08965544332",
    total: 525000,
    status: "PAID"
  },
  {
    date: "25/02/2026 11:30",
    customer: "Robert Wilson",
    contact: "08216677889",
    total: 150000,
    status: "REJECTED"
  },
  {
    date: "25/02/2026 16:55",
    customer: "Siti Aminah",
    contact: "08782233445",
    total: 980000,
    status: "PAID"
  },
  {
    date: "26/02/2026 12:10",
    customer: "Kevin Hartanto",
    contact: "08529988776",
    total: 315000,
    status: "PENDING"
  },
  {
    date: "26/02/2026 15:40",
    customer: "Jessica Lee",
    contact: "08112233445",
    total: 75000,
    status: "PAID"
  }
];

type TTransactionTableProps = {
  onViewDetails: () => void;
};

const TransactionTable = ({ onViewDetails }: TTransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      case "paid":
        return "bg-green-100 text-green-700 border-green-300";
    }
  }
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
          {transactionData.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-5 py-4 font-medium">{data.date}</td>
              <td className="px-5 py-4 font-medium">{data.customer}</td>
              <td className="px-5 py-4 font-medium">{data.contact}</td>
              <td className="px-5 py-4 font-medium">{priceFormatter(data.total)}</td>
              <td className="px-5 py-4 font-medium">
                <div className={`px-4 py-1 rounded-full border w-fit text-sm ${getStatusColor(data.status)}`}>
                  {data.status}
                </div>
              </td>
              <td className="px-5 py-4 font-medium text-gray-600">
                <div className="flex gap-5 items-center">
                  <button
                    className="px-2 py-1 w-fit flex gap-2 items-center hover:bg-gray-200 rounded-md cursor-pointer"
                    onClick={onViewDetails}
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
