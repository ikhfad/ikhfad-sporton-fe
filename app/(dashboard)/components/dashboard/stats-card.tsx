import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  iconColor?: string;
  bgColor?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-primary",
  bgColor = "bg-primary/10",
}: StatsCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-lg md:text-xl 2xl:text-2xl font-bold text-dark">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
