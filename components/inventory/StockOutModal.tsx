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

export default function StockOutModal({
  open,
  onClose,
  onSuccess,
  products,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [remarks, setRemarks] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === Number(productId));
  }, [productId, products]);

  const currentStock = selectedProduct?.stock ?? 0;

  const remainingStock = Math.max(currentStock - quantity, 0);

  useEffect(() => {
    if (!open) {
      setProductId("");
      setQuantity(1);
      setRemarks("");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProduct) return;

    if (quantity > currentStock) {
      alert("Quantity exceeds current stock.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/inventory/stock-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: selectedProduct.id,
          quantity,
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
      alert("Failed to stock out.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
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
              Stock Out
            </h2>

            <p className="text-sm text-gray-500">
              Remove inventory from a product.
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
                  {product.name} ({product.stock})
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
                Remaining Stock
              </label>

              <input
                readOnly
                value={remainingStock}
                className={`${input} bg-red-50`}
              />
            </div>

          </div>

          <div>
            <label className="block mb-2 text-sm">
              Quantity
            </label>

            <input
              type="number"
              min={1}
              max={currentStock}
              required
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className={input}
            />

            {quantity > currentStock && (
              <p className="text-red-600 text-sm mt-2">
                Quantity cannot exceed available stock.
              </p>
            )}
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
              disabled={saving || quantity > currentStock}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Stock Out"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}