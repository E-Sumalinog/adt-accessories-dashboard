"use client";

export default function LoadingInventory() {
  return (
    <div className="space-y-6">

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
          >
            <div className="flex justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-8 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-200" />
              </div>

              <div className="w-12 h-12 rounded-xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Current Stock + Low Stock */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Current Stock */}

        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 animate-pulse">

          <div className="h-6 w-48 rounded bg-gray-200 mb-6" />

          <div className="space-y-4">

            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4"
              >
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 rounded bg-gray-200" />
                <div className="h-4 rounded bg-gray-200" />
              </div>
            ))}

          </div>

        </div>

        {/* Low Stock */}

        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">

          <div className="h-6 w-40 rounded bg-gray-200 mb-6" />

          <div className="space-y-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-3"
              >
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="h-2 rounded bg-gray-200" />
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* Stock Movement */}

      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">

        <div className="h-6 w-56 rounded bg-gray-200 mb-6" />

        <div className="space-y-4">

          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div
              key={row}
              className="grid grid-cols-6 gap-4"
            >
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}