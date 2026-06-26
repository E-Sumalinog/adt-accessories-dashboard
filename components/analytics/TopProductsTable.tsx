"use client";

import { Package } from "lucide-react";

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

interface Props {
  data: TopProduct[];
  loading?: boolean;
}

export default function TopProductsTable({
  data,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Top Selling Products
        </h2>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Top Selling Products
        </h2>

        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Package className="w-10 h-10 mb-3" />

          <p className="text-sm">
            No product sales available.
          </p>
        </div>
      </div>
    );
  }

  const highestRevenue = Math.max(...data.map((p) => p.revenue));

  return (
    <div className="bg-white border border-slate-200 rounded-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Top Selling Products
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Products generating the highest revenue
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 border-b border-slate-200">

            <tr>

              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Product
              </th>

              <th className="px-6 py-3 text-center font-medium text-slate-600">
                Sold
              </th>

              <th className="px-6 py-3 text-right font-medium text-slate-600">
                Revenue
              </th>

              <th className="px-6 py-3 text-left font-medium text-slate-600">
                Performance
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((product, index) => {

              const percentage =
                highestRevenue > 0
                  ? (product.revenue / highestRevenue) * 100
                  : 0;

              return (
                <tr
                  key={product.name}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">

                        <Package className="w-4 h-4 text-green-600" />

                      </div>

                      <div>

                        <p className="font-medium text-slate-800">
                          {product.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          #{index + 1} Best Seller
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-center font-medium text-slate-700">
                    {product.sales}
                  </td>

                  <td className="px-6 py-4 text-right font-semibold text-green-600">
                    ₱{product.revenue.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="w-full bg-slate-100 rounded-full h-2">

                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}