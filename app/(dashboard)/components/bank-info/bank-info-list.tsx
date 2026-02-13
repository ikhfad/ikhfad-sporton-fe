import { Bank } from "@/app/types";
import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";

type TBankInfoListProps = {
  banks: Bank[];
  onEdit: (category: Bank) => void;
  onDelete: (id: string) => void;
};

const BankInfoList = ({ banks, onEdit, onDelete }: TBankInfoListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
      {banks.map((data) => (
        <div
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          key={data._id}
        >
          <div className="flex justify-between gap-2 p-3 sm:p-4 md:p-5">
            <div className="flex gap-2 sm:gap-3 items-center min-w-0 flex-1 overflow-hidden">
              <div className="bg-blue-50 text-blue-600 rounded w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center shrink-0">
                <FiCreditCard size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="font-semibold text-sm md:text-base truncate whitespace-nowrap">
                  {data.bankName}
                </div>
                <div className="text-xs opacity-50">Bank Transfer</div>
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2 text-gray-600 shrink-0 self-start">
              <button
                className="hover:text-primary cursor-pointer p-1.5 sm:p-2 touch-manipulation"
                onClick={() => onEdit?.(data)}
                aria-label="Edit bank"
              >
                <FiEdit2 size={16} className="sm:w-5 sm:h-5" />
              </button>
              <button
                className="hover:text-primary cursor-pointer p-1.5 sm:p-2 touch-manipulation"
                onClick={() => onDelete?.(data._id)}
                aria-label="Delete bank"
              >
                <FiTrash2 size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
          <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 font-medium">
            <div className="text-xs opacity-50 mb-1">ACCOUNT NUMBER</div>
            <div className="text-sm md:text-base break-all">
              {data.accountNumber}
            </div>
          </div>
          <div className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-t border-gray-200 text-xs">
            <span className="opacity-50">Holder :</span>{" "}
            <span className="break-all">{data.accountName}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankInfoList;
