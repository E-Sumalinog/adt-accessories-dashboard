"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

interface MetricCardsProps {
  stats?: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    avgOrderValue: number;
  };
}

export default function MetricCards({
  stats,
}: MetricCardsProps) {
  const metrics = [
    {
      title: "Total Revenue",
      value: `₱${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Orders",
      value: (stats?.totalOrders ?? 0).toLocaleString(),
      change: "+8.2%",
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Customers",
      value: (stats?.totalCustomers ?? 0).toLocaleString(),
      change: "+5.8%",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Average Order",
      value: `₱${(stats?.avgOrderValue ?? 0).toFixed(2)}`,
      change: "+3.1%",
      icon: Target,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              hover:border-green-300
              transition-all
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {metric.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {metric.value}
                </h2>

                <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
                  <TrendingUp size={16} />
                  <span>{metric.change}</span>
                  <span className="text-gray-400 font-normal">
                    vs previous period
                  </span>
                </div>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}