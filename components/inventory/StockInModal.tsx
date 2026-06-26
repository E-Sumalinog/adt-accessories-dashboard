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

export default function StockInModal({
  open,
  onClose,
  onSuccess,
  products,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [productId, setProductId] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [supplier, setSupplier] = useState("");

  const [remarks, setRemarks] = useState("");

  const selectedProduct = useMemo(() => {
    return products.find((p) => p.id === Number(productId));
  }, [productId, products]);

  const currentStock = selectedProduct?.stock ?? 0;

  const newStock = currentStock + quantity;

  useEffect(() => {
    if (!open) {
      setProductId("");
      setQuantity(1);
      setSupplier("");
      setRemarks("");
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedProduct) return;

    setSaving(true);

    try {
      const res = await fetch("/api/inventory/stock-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: selectedProduct.id,
          quantity,
          supplier,
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
      alert("Failed to stock in.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  const input =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none";

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div className="flex justify-between items-center border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              Stock In
            </h2>

            <p className="text-sm text-gray-500">
              Add inventory to a product.
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
              className={input}
              value={productId}
              onChange={(e) =>
                setProductId(e.target.value)
              }
              required
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
                readOnly
                value={newStock}
                className={`${input} bg-green-50`}
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
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
              className={input}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Supplier
            </label>

            <input
              value={supplier}
              onChange={(e) =>
                setSupplier(e.target.value)
              }
              className={input}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Remarks
            </label>

            <textarea
              rows={3}
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              className={input}
            />
          </div>

          {/* FOOTER */}

          <div className="flex justify-end gap-3 pt-3 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              {saving ? "Saving..." : "Stock In"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}