"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import StatsGrid from "../components/dashboard/stats-grid";
import TransactionStatusChart from "../components/dashboard/transaction-status-chart";
import LowStockAlert from "../components/dashboard/low-stock-alert";
import TopProducts from "../components/dashboard/top-products";
import RecentTransactions from "../components/dashboard/recent-transactions";
import { getAllProducts } from "@/app/services/product.service";
import { getAllCategories } from "@/app/services/category.service";
import { getAllTransaction } from "@/app/services/transaction.service";
import { Product, Category, Transaction } from "@/app/types";

interface DashboardData {
  products: Product[];
  categories: Category[];
  transactions: Transaction[];
}

const DashboardPage = () => {
  const isMounted = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    products: [],
    categories: [],
    transactions: [],
  });

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [products, categories, transactions] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
        getAllTransaction(),
      ]);

      if (isMounted.current) {
        setData({ products, categories, transactions });
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchDashboardData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchDashboardData]);

  // Calculate statistics
  const totalProducts = data.products.length;
  const totalCategories = data.categories.length;
  const totalTransactions = data.transactions.length;

  // Calculate total revenue from paid transactions
  const totalRevenue = data.transactions
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + parseFloat(t.totalPayment), 0);

  // Count transactions by status
  const pendingTransactions = data.transactions.filter(
    (t) => t.status === "pending",
  ).length;
  const paidTransactions = data.transactions.filter(
    (t) => t.status === "paid",
  ).length;
  const rejectedTransactions = data.transactions.filter(
    (t) => t.status === "rejected",
  ).length;

  // Get current date for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6 md:mb-10">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">Dashboard</h1>
          <p className="opacity-50 text-sm md:text-base">
            {getGreeting()}! Here is your store overview.
          </p>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-gray-500 sm:block">
            {getCurrentDate()}
          </span>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 md:mb-8">
        <StatsGrid
          totalProducts={totalProducts}
          totalCategories={totalCategories}
          totalTransactions={totalTransactions}
          totalRevenue={totalRevenue}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          <TransactionStatusChart
            pending={pendingTransactions}
            paid={paidTransactions}
            rejected={rejectedTransactions}
          />
          <TopProducts transactions={data.transactions} />
        </div>

        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          <LowStockAlert products={data.products} />
          <RecentTransactions transactions={data.transactions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
