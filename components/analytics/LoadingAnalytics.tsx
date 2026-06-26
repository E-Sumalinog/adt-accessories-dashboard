"use client";

export default function LoadingAnalytics() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-slate-200 rounded-xl p-6"
          >
            <div className="flex items-center justify-between">

              <div className="space-y-3 flex-1">

                <div className="h-3 w-24 rounded bg-slate-200" />

                <div className="h-8 w-32 rounded bg-slate-200" />

                <div className="h-3 w-20 rounded bg-slate-200" />

              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-200" />

            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Revenue Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">

          <div className="h-5 w-48 bg-slate-200 rounded mb-6" />

          <div className="flex items-end justify-between h-72 gap-3">

            {[1, 2, 3, 4, 5, 6].map((bar) => (
              <div
                key={bar}
                className="flex-1 rounded-t-lg bg-slate-200"
                style={{
                  height: `${40 + bar * 18}px`,
                }}
              />
            ))}

          </div>

        </div>

        {/* Category Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">

          <div className="h-5 w-40 bg-slate-200 rounded mb-8" />

          <div className="flex items-center justify-center">

            <div className="w-56 h-56 rounded-full border-[26px] border-slate-200" />

          </div>

        </div>

      </div>

      {/* Top Products */}
      <div className="bg-white border border-slate-200 rounded-xl">

        <div className="px-6 py-4 border-b border-slate-200">

          <div className="h-5 w-48 bg-slate-200 rounded mb-2" />

          <div className="h-3 w-64 bg-slate-200 rounded" />

        </div>

        <div className="divide-y divide-slate-100">

          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between px-6 py-4"
            >

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-lg bg-slate-200" />

                <div className="space-y-2">

                  <div className="h-4 w-40 rounded bg-slate-200" />

                  <div className="h-3 w-24 rounded bg-slate-200" />

                </div>

              </div>

              <div className="h-4 w-20 rounded bg-slate-200" />

              <div className="h-4 w-24 rounded bg-slate-200" />

              <div className="w-40 h-2 rounded-full bg-slate-200" />

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}