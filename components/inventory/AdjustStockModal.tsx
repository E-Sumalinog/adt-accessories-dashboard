"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  products: Product[];
}

export default function AdjustStockModal({
  open,
  onClose,
  onSuccess,
  products,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [productId, setProductId] = useState("");

  const [newStock, setNewStock] = useState(0);

  const [remarks, setRemarks] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === Number(productId));
  }, [productId, products]);

  const currentStock = selectedProduct?.stock ?? 0;

  const difference = newStock - currentStock;

  useEffect(() => {
    if (!open) {
      setProductId("");
      setNewStock(0);
      setRemarks("");
    }
  }, [open]);

  useEffect(() => {
    if (selectedProduct) {
      setNewStock(selectedProduct.stock);
    }
  }, [selectedProduct]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProduct) return;

    setSaving(true);

    try {
      const res = await fetch("/api/inventory/adjust", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: selectedProduct.id,
          newStock,
          remarks,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to adjust stock.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex justify-between items-center border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Adjust Stock
            </h2>

            <p className="text-sm text-gray-500">
              Correct inventory after physical counting.
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm">
              Product
            </label>

            <select
              required
              className={input}
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm">
                Current Stock
              </label>

              <input
                readOnly
                value={currentStock}
                className={`${input} bg-gray-100`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                New Stock
              </label>

              <input
                type="number"
                min={0}
                required
                value={newStock}
                onChange={(e) =>
                  setNewStock(Number(e.target.value))
                }
                className={input}
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 text-sm">
              Adjustment
            </label>

            <input
              readOnly
              value={
                difference > 0
                  ? `+${difference}`
                  : difference
              }
              className={`${input} ${
                difference > 0
                  ? "bg-green-50 text-green-700"
                  : difference < 0
                  ? "bg-red-50 text-red-700"
                  : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Remarks
            </label>

            <textarea
              rows={3}
              className={input}
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              placeholder="Reason for adjustment..."
            />
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 border-t pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {saving ? "Saving..." : "Adjust Stock"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}