"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
} from "lucide-react";

export interface StockMovement {
  id: string;
  product_name: string;
  transaction_type: "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";
  quantity: number;
  previous_stock: number;
  new_stock: number;
  remarks: string;
  created_at: string;
  created_by: string;
}

interface Props {
  movements: StockMovement[];
  loading: boolean;
}

export default function StockMovementTable({
  movements,
  loading,
}: Props) {
  function badge(type: string) {
    switch (type) {
      case "STOCK_IN":
        return {
          label: "Stock In",
          className: "bg-green-100 text-green-700 border-green-200",
          icon: ArrowDownCircle,
        };

      case "STOCK_OUT":
        return {
          label: "Stock Out",
          className: "bg-red-100 text-red-700 border-red-200",
          icon: ArrowUpCircle,
        };

      default:
        return {
          label: "Adjustment",
          className: "bg-blue-100 text-blue-700 border-blue-200",
          icon: RefreshCcw,
        };
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-12 rounded bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Inventory History
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Recent stock movements and adjustments.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-3 text-left text-xs uppercase font-semibold text-gray-500">
                Product
              </th>

              <th className="px-4 py-3 text-center text-xs uppercase font-semibold text-gray-500">
                Type
              </th>

              <th className="px-4 py-3 text-center text-xs uppercase font-semibold text-gray-500">
                Qty
              </th>

              <th className="px-4 py-3 text-center text-xs uppercase font-semibold text-gray-500">
                Previous
              </th>

              <th className="px-4 py-3 text-center text-xs uppercase font-semibold text-gray-500">
                New
              </th>

              <th className="px-4 py-3 text-left text-xs uppercase font-semibold text-gray-500">
                Remarks
              </th>

              <th className="px-4 py-3 text-left text-xs uppercase font-semibold text-gray-500">
                User
              </th>

              <th className="px-6 py-3 text-right text-xs uppercase font-semibold text-gray-500">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {movements.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No inventory transactions found.
                </td>
              </tr>
            ) : (
              movements.map((movement) => {
                const status = badge(movement.transaction_type);
                const Icon = status.icon;

                return (
                  <tr
                    key={movement.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {movement.product_name}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${status.className}`}
                      >
                        <Icon size={14} />
                        {status.label}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {movement.quantity}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {movement.previous_stock}
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {movement.new_stock}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600 max-w-xs">
                      {movement.remarks || "-"}
                    </td>

                    <td className="px-4 py-4">
                      {movement.created_by}
                    </td>

                    <td className="px-6 py-4 text-right text-sm text-gray-500 whitespace-nowrap">
                      {new Date(movement.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}