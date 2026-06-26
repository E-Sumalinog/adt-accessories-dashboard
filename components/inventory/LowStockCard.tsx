"use client";

import {
  AlertTriangle,
  Package,
  ArrowRight,
} from "lucide-react";

export interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  min_stock: number;
}

interface Props {
  products: LowStockProduct[];
  loading: boolean;
}

export default function LowStockCard({
  products,
  loading,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-5 h-5 rounded bg-gray-200 animate-pulse" />
          <div className="w-32 h-4 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Header */}

      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">

          <AlertTriangle
            size={20}
            className="text-yellow-500"
          />

          <div>
            <h2 className="font-semibold text-gray-900">
              Low Stock Alerts
            </h2>

            <p className="text-sm text-gray-500">
              Products that need replenishment
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
          {products.length}
        </span>
      </div>

      {/* Content */}

      {products.length === 0 ? (
        <div className="py-10 text-center">

          <Package
            className="mx-auto text-green-500 mb-3"
            size={42}
          />

          <h3 className="font-semibold text-gray-800">
            Inventory Healthy
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            No products are currently below their minimum stock.
          </p>
        </div>
      ) : (
        <div className="divide-y">

          {products.map((product) => (

            <div
              key={product.id}
              className="px-6 py-4 hover:bg-gray-50 transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h4 className="font-medium text-gray-900">
                    {product.name}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    SKU: {product.sku}
                  </p>

                  <p className="text-xs text-gray-500">
                    {product.category}
                  </p>

                </div>

                <div className="text-right">

                  <div className="text-lg font-bold text-red-600">
                    {product.stock}
                  </div>

                  <div className="text-xs text-gray-500">
                    Min: {product.min_stock}
                  </div>

                </div>

              </div>

              {/* Progress */}

              <div className="mt-3">

                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        (product.stock / product.min_stock) * 100,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Footer */}

      {products.length > 0 && (
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">

          <button
            className="
              w-full
              flex
              justify-center
              items-center
              gap-2
              text-sm
              font-medium
              text-green-600
              hover:text-green-700
            "
          >
            View All Low Stock Products

            <ArrowRight size={16} />

          </button>

        </div>
      )}
    </div>
  );
}