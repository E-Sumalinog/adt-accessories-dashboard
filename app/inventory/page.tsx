"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// Components
import Sidebar from "@/components/Sidebar";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryStats from "@/components/inventory/InventoryStats";
import CurrentStockTable from "@/components/inventory/CurrentStockTable";
import LowStockCard from "@/components/inventory/LowStockCard";
import StockMovementTable from "@/components/inventory/StockMovementTable";
import StockInModal from "@/components/inventory/StockInModal";
import StockOutModal from "@/components/inventory/StockOutModal";
import AdjustStockModal from "@/components/inventory/AdjustStockModal";

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  stock: number;
  min_stock: number;
  price: number;
  supplier: string;
}

interface Movement {
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

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // MODALS
  const [stockInOpen, setStockInOpen] = useState(false);
  const [stockOutOpen, setStockOutOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [productsRes, movementsRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/inventory/history"),
      ]);

      if (!productsRes.ok) {
        throw new Error("Products API failed");
      }

      if (!movementsRes.ok) {
        throw new Error("History API failed");
      }

      const productsData = await productsRes.json();
      const movementsData = await movementsRes.json();

      setProducts(productsData);
      setMovements(movementsData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inventory data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // FILTERED PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      `${p.name} ${p.sku}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  // STATS
  const stats = useMemo(() => {
    return {
      totalProducts: products.length,
      totalStock: products.reduce((a, b) => a + b.stock, 0),
      lowStock: products.filter(
        (p) => p.stock > 0 && p.stock <= p.min_stock
      ).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
    };
  }, [products]);

  // LOW STOCK
  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock <= p.min_stock);
  }, [products]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
       <div className="ml-64 w-[calc(100%-16rem)] min-h-screen space-y-6">
          <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <InventoryHeader
              search={search}
              setSearch={setSearch}
              onStockIn={() => setStockInOpen(true)}
              onStockOut={() => setStockOutOpen(true)}
              onAdjustment={() => setAdjustOpen(true)}
            />

            {/* STATS */}
            <InventoryStats stats={stats} />

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* TABLE */}
              <div className="xl:col-span-2">
                <CurrentStockTable
                  products={filteredProducts}
                  loading={loading}
                  onAdjust={() => setAdjustOpen(true)}
                />
              </div>

              {/* LOW STOCK */}
              <LowStockCard
                products={lowStockProducts}
                loading={loading}
              />
            </div>

            {/* MOVEMENT HISTORY */}
            <StockMovementTable
              movements={movements}
              loading={loading}
            />

            {/* MODALS */}
            <StockInModal
              open={stockInOpen}
              onClose={() => setStockInOpen(false)}
              onSuccess={loadData}
              products={products}
            />

            <StockOutModal
              open={stockOutOpen}
              onClose={() => setStockOutOpen(false)}
              onSuccess={loadData}
              products={products}
            />

            <AdjustStockModal
              open={adjustOpen}
              onClose={() => setAdjustOpen(false)}
              onSuccess={loadData}
              products={products}
            />

          </div>
        </div>
    </div>
  );
}