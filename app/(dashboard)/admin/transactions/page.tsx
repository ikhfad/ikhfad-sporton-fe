"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { Transaction } from "@/app/types";
import {
  getAllTransaction,
  updateTransaction,
} from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const TransactionManagement = () => {
  const isMounted = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  const fetchTransaction = useCallback(async () => {
    try {
      const data = await getAllTransaction();

      if (isMounted.current && data) {
        setTimeout(() => {
          if (isMounted.current) {
            setTransaction(data);
          }
        }, 0);
      }
    } catch (error) {
      if (isMounted.current) {
        console.error("Failed to fetch products", error);
      }
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setIsModalOpen(true);
    setSelectedTransaction(transaction);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected",
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      await updateTransaction(id, { status });
      toast.success("Transaction status updated");
      await fetchTransaction();
    } catch (error) {
      console.error("Failed to update transaction status", error);
      toast.error("Failed to update transaction status");
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchTransaction();

    return () => {
      isMounted.current = false;
    };
  }, [fetchTransaction]);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable
        transaction={transaction}
        onViewDetails={handleViewDetails}
      />
      <TransactionModal
        transaction={selectedTransaction}
        onStatusChange={handleStatusChange}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TransactionManagement;
