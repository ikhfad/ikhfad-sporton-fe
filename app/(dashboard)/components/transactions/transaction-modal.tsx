import Modal from "../ui/modal";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "@/app/(landing)/components/ui/button";
import { FiX, FiCheck } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onStatusChange: (id: string, status: "paid" | "rejected") => Promise<void>;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onStatusChange,
}: TTransactionModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return null;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    if (!transaction?._id) return;

    setIsUpdating(true);
    try {
      await onStatusChange(transaction._id, status);
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div className="min-w-50">
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="Payment Proof Image"
              width={200}
              height={400}
            />
          ) : (
            <div className="text-center p-4">
              <div className="text-sm">No payment proof uploaded</div>
            </div>
          )}
        </div>
        <div className="w-full">
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="mb-5 bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-sm">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">
                {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{transaction.customerName}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{transaction.customerContact}</div>
            </div>
            <div className="flex justify-between font-medium gap-10">
              <div className="opacity-50 whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right">{transaction.customerAddress}</div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-2">Items Purchased</h4>
          <div className="space-y-3">
            {transaction.purchasedItems.map((item, index) => (
              <div
                className="border border-gray-200 rounded-lg p-2 flex items-center gap-2"
                key={index}
              >
                <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                  <Image
                    src={
                      getImageUrl(item?.productId?.imageUrl) ||
                      "/images/placeholder/placeholder-30x30.svg"
                    }
                    width={30}
                    height={30}
                    alt="product image"
                  />
                </div>
                <div className="font-medium text-sm">
                  {item?.productId?.name || "Unknown Product (Deleted)"}
                </div>
                <div className="font-medium ml-auto text-sm">
                  {item?.qty || "0"} units
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm mt-6">
            <h4 className="font-semibold">Total: </h4>
            <div className="text-primary font-semibold ">
              {priceFormatter(parseInt(transaction.totalPayment))}
            </div>
          </div>
          <div className=" flex justify-end gap-5 mt-12">
            {isUpdating ? (
              <div className="px-7 py-2.5 text-center w-full bg-gray-300 rounded-md">
                Updating...
              </div>
            ) : (
              <>
                <Button
                  className="text-primary! bg-primary-light! rounded-md"
                  size="small"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isUpdating}
                >
                  <FiX size={20} />
                  Reject
                </Button>
                <Button
                  className="text-white! bg-[#50C252]! rounded-md"
                  size="small"
                  onClick={() => handleStatusUpdate("paid")}
                  disabled={isUpdating}
                >
                  <FiCheck size={20} />
                  Approve
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
