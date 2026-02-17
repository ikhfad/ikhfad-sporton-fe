import { FiBox, FiLayers, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import StatsCard from "./stats-card";
import { formatDashboardCurrencyNumber } from "@/app/utils/price-formatter";

interface StatsGridProps {
  totalProducts: number;
  totalCategories: number;
  totalTransactions: number;
  totalRevenue: number;
}

const StatsGrid = ({
  totalProducts,
  totalCategories,
  totalTransactions,
  totalRevenue,
}: StatsGridProps) => {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: FiBox,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Categories",
      value: totalCategories,
      icon: FiLayers,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: FiShoppingCart,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: formatDashboardCurrencyNumber(totalRevenue),
      icon: FiDollarSign,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
