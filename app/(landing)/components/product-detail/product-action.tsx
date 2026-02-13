"use client";

import { FiArrowRight, FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";

type TProductActionsProps = {
  product: Product;
  stock: number;
};

const ProductActions = ({ product, stock }: TProductActionsProps) => {
  const { addItem } = useCartStore();
  const { push } = useRouter();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  return (
    <>
      {/* ---------- DESKTOP (≥ xl) ---------- */}
      <div className="hidden xl:flex xl:flex-row xl:justify-between gap-5">
        <div className="flex items-center border border-gray-300 rounded-md w-fit">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-5 h-5" />
          </button>
          <input
            type="number"
            value={qty}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= stock) {
                setQty(val);
              }
            }}
            className="w-14 text-center border-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min={1}
            max={stock}
            aria-label="Quantity"
          />
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-r-md"
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            disabled={qty >= stock}
            aria-label="Increase quantity"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-row gap-4 w-full max-[calc(100%-130px)]:">
          <Button
            className="px-6 py-2.5 justify-center"
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="w-5 h-5" />
            <span className="ml-2">Add to Cart</span>
          </Button>
          <Button
            variant="dark"
            className="px-6 py-2.5 justify-center"
            onClick={() => push("/checkout")}
          >
            <span className="mr-2 block">Checkout Now</span>
            <FiArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* ---------- TABLET / MOBILE (< xl) ---------- */}
      <div className="xl:hidden flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div className="flex items-center border border-gray-300 rounded-md w-fit">
            <button
              className="p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-l-md"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= stock) {
                  setQty(val);
                }
              }}
              className="w-12 text-center border-0 focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-sm"
              min={1}
              max={stock}
              aria-label="Quantity"
            />
            <button
              className="p-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent rounded-r-md"
              onClick={() => setQty((q) => Math.min(stock, q + 1))}
              disabled={qty >= stock}
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>
          <Button
            className="flex-1 px-4 py-2 justify-center text-sm"
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="w-4 h-4" />
            <span className="ml-2">Add to Cart</span>
          </Button>
        </div>
        <Button
          variant="dark"
          className="w-full px-4 py-2 justify-center text-sm"
          onClick={() => push("/checkout")}
        >
          <span className="mr-2">Checkout Now</span>
          <FiArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
