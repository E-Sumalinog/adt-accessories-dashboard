"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface RevenueChartProps {
  data: SalesData[];
  loading?: boolean;
}

type Metric = "revenue" | "orders" | "customers";

export default function RevenueChart({
  data,
  loading = false,
}: RevenueChartProps) {
  const [metric, setMetric] = useState<Metric>("revenue");

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />

          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-9 w-24 rounded-lg bg-gray-200"
              />
            ))}
          </div>

          <div className="h-[320px] bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-lg font-semibold text-gray-900">
            Revenue Trend
          </h2>

          <p className="text-sm text-gray-500">
            Monthly business performance
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setMetric("revenue")}
            className={`px-3 py-2 rounded-lg text-sm transition ${
              metric === "revenue"
                ? "bg-green-600 text-white"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Revenue
          </button>

          <button
            onClick={() => setMetric("orders")}
            className={`px-3 py-2 rounded-lg text-sm transition ${
              metric === "orders"
                ? "bg-green-600 text-white"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Orders
          </button>

          <button
            onClick={() => setMetric("customers")}
            className={`px-3 py-2 rounded-lg text-sm transition ${
              metric === "customers"
                ? "bg-green-600 text-white"
                : "border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Customers
          </button>

        </div>

      </div>

      {data.length === 0 ? (
        <div className="h-[320px] flex items-center justify-center text-gray-500 text-sm">
          No analytics data available.
        </div>
      ) : (
        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    backgroundColor: "#fff",
                }}
                />

              <Bar
                dataKey={metric}
                radius={[8, 8, 0, 0]}
                fill="#16a34a"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>
      )}
    </div>
  );
}