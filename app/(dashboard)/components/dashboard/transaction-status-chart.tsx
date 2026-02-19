"use client";

import Link from "next/link";

interface TransactionStatusChartProps {
  pending: number;
  paid: number;
  rejected: number;
}

const TransactionStatusChart = ({
  pending,
  paid,
  rejected,
}: TransactionStatusChartProps) => {
  const total = pending + paid + rejected;

  const getStatusPercentage = (count: number): number => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  const statusData = [
    {
      label: "Pending",
      count: pending,
      percentage: getStatusPercentage(pending),
      color: "bg-yellow-400",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Paid",
      count: paid,
      percentage: getStatusPercentage(paid),
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
    },
    {
      label: "Rejected",
      count: rejected,
      percentage: getStatusPercentage(rejected),
      color: "bg-red-400",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-base sm:text-lg">
          Transaction Status
        </h2>
        <Link
          href="/admin/transactions"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Stacked Bar Chart */}
      <div className="mb-6">
        <div className="h-8 w-full rounded-lg overflow-hidden flex bg-gray-100">
          {statusData.map((status, index) => (
            <div
              key={index}
              className={`${status.color} transition-all duration-500`}
              style={{ width: `${status.percentage}%` }}
              title={`${status.label}: ${status.count} (${status.percentage}%)`}
            />
          ))}
        </div>
      </div>

      {/* Status Legend */}
      <div className="space-y-3">
        {statusData.map((status, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${status.color}`} />
              <span className="text-sm font-medium text-gray-700">
                {status.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${status.textColor}`}>
                {status.count}
              </span>
              <span className="text-xs text-gray-400">
                ({status.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Transactions</span>
          <span className="font-semibold text-dark">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatusChart;
