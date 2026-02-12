"use client";

import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import OrderRejected from "../../components/order-status/order-rejected";
import { getTransactionById } from "@/app/services/transaction.service";
import { TPageProps } from "../../product/[id]/page";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Transaction } from "@/app/types";

const OrderStatus = ({ params }: TPageProps) => {
  const [id, setId] = useState<string>("");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(id);
        setTransaction(data);
        if (data.status === "pending") {
          toast.success(
            "Transaction submitted successfully! We will review your payment.",
          );
        }
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto pt-40 pb-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
          <p className="text-center">Loading...</p>
        </div>
      </main>
    );
  }

  if (!transaction) {
    return (
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto pt-40 pb-20">
          <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
          <p className="text-center">Transaction not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto pt-40 pb-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
      </div>
      {transaction.status === "pending" && <OrderSubmitted />}
      {transaction.status === "paid" && <OrderConfirmed />}
      {transaction.status === "rejected" && <OrderRejected />}
    </main>
  );
};

export default OrderStatus;
