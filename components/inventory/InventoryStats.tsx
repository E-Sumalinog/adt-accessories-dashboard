"use client";

import {
  Package,
  Boxes,
  AlertTriangle,
  X,
} from "lucide-react";

interface InventoryStatsProps {
  stats?: {
    totalProducts: number;
    totalStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

export default function InventoryStats({
  stats,
}: InventoryStatsProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
          >
            <div className="flex justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-8 w-20 rounded bg-gray-200" />
              </div>

              <div className="w-12 h-12 rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Current Stock",
      value: stats.totalStock,
      icon: Boxes,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: AlertTriangle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: X,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              transition-all
              duration-200
              hover:border-green-300
              hover:-translate-y-0.5
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {card.value.toLocaleString()}
                </h2>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
              >
                <Icon
                  className={`w-6 h-6 ${card.iconColor}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}