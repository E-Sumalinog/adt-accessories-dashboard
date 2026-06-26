"use client";

import { CalendarDays, Download } from "lucide-react";
import UserDropdown from "@/components/UserDropdown";

interface Props {
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
}

export default function AnalyticsHeader({
  period,
  setPeriod,
}: Props) {
  return (
    <header className="bg-white border-b border-red-200 px-8 py-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor your sales performance, customer growth and business
            insights.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Period */}
          <div className="relative">

            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="
                h-11
                rounded-lg
                border
                border-gray-300
                bg-white
                pl-10
                pr-8
                text-sm
                outline-none
                transition
                focus:border-green-500
                focus:ring-2
                focus:ring-green-100
              "
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>

          </div>

          {/* Export */}
          <button
            className="
              flex
              items-center
              gap-2
              h-11
              px-4
              rounded-lg
              border
              border-gray-300
              bg-white
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              transition
            "
          >
            <Download size={18} />

            Export
          </button>

          <UserDropdown />

        </div>

      </div>
    </header>
  );
}