import React from "react";
import { Package } from "lucide-react";

const ProductHeader = () => {
  return (
    <header className="hero-panel rounded-box px-5 py-7 text-primary-content shadow-xl sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:item-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white">
              <Package className="size-7" />
            </div>
            <span className="badge badge-outline border-white/40 text-white">
              Product
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Product Management System
          </h1>
          <p className="mt-2 max-w-xl text-sm text-primary-content/75 sm:text-base">
            จัดการสินค้าและราคาได้อย่างรวดเร็วในที่เดียว
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
