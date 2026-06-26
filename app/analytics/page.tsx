"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/Sidebar";
import UserDropdown from "@/components/UserDropdown";

import AnalyticsHeader from "@/components/analytics/AnalyticsHeader";
import MetricCards from "@/components/analytics/MetricCards";
import RevenueChart from "@/components/analytics/RevenueChart";
import CategoryChart from "@/components/analytics/CategoryChart";
import TopProductsTable from "@/components/analytics/TopProductsTable";
import LoadingAnalytics from "@/components/analytics/LoadingAnalytics";

interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface CategoryData {
  category: string;
  sales: number;
  revenue: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
}

interface AnalyticsResponse {
  salesData: SalesData[];
  categoryData: CategoryData[];
  topProducts: TopProduct[];
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    avgOrderValue: number;
  };
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6months");

  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/analytics?period=${period}`
      );

      if (!res.ok) {
        throw new Error("Failed to load analytics");
      }

      const data = await res.json();

      setAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="ml-64">

        <AnalyticsHeader
          period={period}
          setPeriod={setPeriod}
        />

        <main className="p-6 space-y-6">

          {loading ? (

            <LoadingAnalytics />

          ) : (

            <>

              <MetricCards
                stats={analytics?.stats}
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <RevenueChart
                  data={analytics?.salesData ?? []}
                />

                <CategoryChart
                  data={analytics?.categoryData ?? []}
                />

              </div>

              <TopProductsTable
                data={analytics?.topProducts ?? []}
              />

            </>

          )}

        </main>

      </div>

    </div>
  );
}