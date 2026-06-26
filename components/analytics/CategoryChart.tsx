"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface CategoryData {
  category: string;
  sales: number;
  revenue: number;
}

interface Props {
  data: CategoryData[];
}

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#dc2626",
  "#7c3aed",
  "#0891b2",
  "#db2777",
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <p className="font-medium text-slate-800 mb-2">
        {item.category}
      </p>

      <p className="text-sm text-slate-600">
        Revenue:
        <span className="ml-1 font-semibold text-green-600">
          ₱{Number(item.revenue).toLocaleString()}
        </span>
      </p>

      <p className="text-sm text-slate-600">
        Sales:
        <span className="ml-1 font-semibold">
          {item.sales}
        </span>
      </p>
    </div>
  );
}

export default function CategoryChart({
  data,
}: Props) {
  if (!data.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Sales by Category
        </h2>

        <div className="flex h-80 items-center justify-center text-slate-400 text-sm">
          No category data available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">

      <h2 className="text-lg font-semibold text-slate-800 mb-6">
        Sales by Category
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="revenue"
              nameKey="category"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}