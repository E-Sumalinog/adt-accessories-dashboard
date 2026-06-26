"use client";

import { MoreHorizontal, Pencil, ArrowUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  min_stock: number;
  price: number;
  supplier: string;
}

interface Props {
  products: Product[];
  loading: boolean;
  onAdjust: (product: Product) => void;
}

export default function CurrentStockTable({
  products,
  loading,
  onAdjust,
}: Props) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    }

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  function getStatus(stock: number, min: number) {
    if (stock <= 0)
      return {
        label: "Out of Stock",
        color:
          "bg-red-100 text-red-700 border-red-200",
      };

    if (stock <= min)
      return {
        label: "Low Stock",
        color:
          "bg-yellow-100 text-yellow-700 border-yellow-200",
      };

    return {
      label: "In Stock",
      color:
        "bg-green-100 text-green-700 border-green-200",
    };
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 rounded bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 text-lg">
          Current Inventory
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Monitor all product stock levels.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Product
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                SKU
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                Category
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                Current
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                Min Stock
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-gray-500">
                Price
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                Status
              </th>

              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-10 text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getStatus(
                  product.stock,
                  product.min_stock
                );

                return (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>

                      <div className="text-xs text-gray-500">
                        {product.supplier}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {product.sku}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-700">
                      {product.category}
                    </td>

                    <td className="px-4 py-4 text-center font-semibold">
                      {product.stock}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {product.min_stock}
                    </td>

                    <td className="px-4 py-4 text-right">
                      ₱{Number(product.price).toLocaleString()}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs border font-medium ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center relative">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === product.id
                              ? null
                              : product.id
                          )
                        }
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === product.id && (
                        <div
                          ref={menuRef}
                          className="
                            absolute
                            right-4
                            mt-2
                            w-48
                            bg-white
                            rounded-xl
                            border
                            border-gray-200
                            shadow-lg
                            z-50
                          "
                        >
                          <button
                            onClick={() => {
                              onAdjust(product);
                              setOpenMenu(null);
                            }}
                            className="
                              w-full
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              hover:bg-gray-50
                              text-sm
                            "
                          >
                            <ArrowUpDown
                              size={16}
                              className="text-blue-600"
                            />

                            Adjust Stock
                          </button>

                          <button
                            onClick={() => {
                              onAdjust(product);
                              setOpenMenu(null);
                            }}
                            className="
                              w-full
                              flex
                              items-center
                              gap-3
                              px-4
                              py-3
                              hover:bg-gray-50
                              text-sm
                            "
                          >
                            <Pencil
                              size={16}
                              className="text-green-600"
                            />

                            Edit Product
                          </button>
                        </div>
                      )}
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