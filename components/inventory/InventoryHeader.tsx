"use client";

import { Boxes, ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  onStockIn: () => void;
  onStockOut: () => void;
  onAdjustment: () => void;
}

export default function InventoryHeader({
  search,
  setSearch,
  onStockIn,
  onStockOut,
  onAdjustment,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Boxes className="w-6 h-6 text-green-700" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Inventory
              </h1>

              <p className="text-sm text-gray-500">
                Manage stock movement and monitor inventory levels.
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              md:w-72
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />

          <button
            onClick={onStockIn}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2
              rounded-lg
              bg-green-600
              hover:bg-green-700
              text-white
            "
          >
            <ArrowDownToLine size={18} />
            Stock In
          </button>

          <button
            onClick={onStockOut}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2
              rounded-lg
              bg-red-600
              hover:bg-red-700
              text-white
            "
          >
            <ArrowUpFromLine size={18} />
            Stock Out
          </button>

          <button
            onClick={onAdjustment}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-4
              py-2
              rounded-lg
              border
              border-gray-300
              hover:bg-gray-50
            "
          >
            <SlidersHorizontal size={18} />
            Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}