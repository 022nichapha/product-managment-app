import { Package, Pencil, Trash2 } from "lucide-react";
import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length == 0) {
    return (
      <div className="card border border-dashed border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center py-14 text-center">
          <Package className="size-12 text-base-content/25" />
          <h2 className="card-tilte mt-2">ยังไม่มีข้อมูลสินค้า</h2>
          <p className="text-sm text-base-content/60">
            เริ่มต้นด้วยการเพิ่มสินค้าใหม่ด้านบน
          </p>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">รายการสินค้าทั้งหมด</h2>
          <p className="text-sm text-base-content/60">
            มีสินค้า {products.length} รายการ
          </p>
        </div>
        <span className="badge badge-primary badge-lg">{products.length}</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
            key={product.id}
          >
            <figure className="aspect-[4/3] bg-base-200">
              {product.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <Package className="size-14 text-base-content/25" />
              )}
            </figure>
            <div className="card-body gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-base-content/50">
                    #{product.id}
                  </p>
                  <h3 className="mt-1 truncate text-lg font-bold">
                    {product.name}
                  </h3>
                </div>
                <span className="whitespace-nowrap font-bold text-success">
                  {Number(product.price).toLocaleString()}฿
                </span>
              </div>
              <p className="min-h-10 text-sm text-base-content/70">
                {product.description || "ไม่มีรายละเอียดสินค้า"}
              </p>
              <div className="card-actions justify-end border-t border-base-200 pt-3">
                <button
                  className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                  onClick={() => onEdit(product)}
                  aria-label={`แก้ไขสินค้า ${product.name}`}
                >
                  <Pencil className="size-4" /> แก้ไข
                </button>
                <button
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                  onClick={() => onDelete(product.id)}
                  aria-label={`ลบสินค้า ${product.name}`}
                >
                  <Trash2 className="size-4" /> ลบ
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
