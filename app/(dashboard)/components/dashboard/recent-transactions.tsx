"use client";

import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { formatDashboardCurrencyString } from "@/app/utils/price-formatter";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  // Sort by date and take last 5
  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "paid":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (recentTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiClock className="text-blue-500" />
            <h2 className="font-semibold text-lg">Recent Transactions</h2>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No transactions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiClock className="text-blue-500" />
          <h2 className="font-semibold text-lg">Recent Transactions</h2>
        </div>
        <Link
          href="/admin/transactions"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex max-[400px]:flex-col flex-row items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex max-[400px]:mb-2 mb-0 items-center gap-3 min-w-0 max-[400px]:w-full shrink-0">
              {/* Customer Initial */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {transaction.customerName.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-dark truncate">
                  {transaction.customerName}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.purchasedItems.length} item(s) •{" "}
                  {formatDate(transaction.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 max-[400px]:w-full shrink-0 max-[400px]:justify-between">
              <span className="text-sm font-semibold text-dark">
                {formatDashboardCurrencyString(transaction.totalPayment)}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getStatusBadge(
                  transaction.status,
                )}`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/admin/transactions"
        className="flex items-center justify-center gap-2 mt-4 text-sm text-primary hover:underline"
      >
        <span>View All Transactions</span>
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default RecentTransactions;
