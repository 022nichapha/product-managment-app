import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductsHeader from "../components/ProductsHeader.jsx";
import ProductsList from "../components/ProductsList.jsx";
import PageState from "../components/PageState.jsx";
import { getProduct, deleteProduct } from "../services/productService.js";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getProduct();
      setProducts(result);
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณต้องการลบรายการสินค้านี้ใช่หรือไม่?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((item) => item.id !== id));
        alert("ลบสินค้าเรียบร้อยแล้ว");
      } catch (err) {
        alert(err.message || "เกิดข้อผิดพลาดในการลบสินค้า");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <main className="mx-auto max-w-6xl">
        {/* แก้ตรงนี้เป็น ProductsHeader (มี s) ให้ตรงกับตัวแปรที่ import ด้านบน */}
        <ProductsHeader />

        <div className="mt-6 flex justify-end">
          <Link className="btn btn-primary text-white" to="/products/add">
            เพิ่มสินค้า
          </Link>
        </div>

        <div className="mt-6 rounded-box bg-base-100 p-6 shadow-lg">
          {loading && (
            <PageState type="loading" message="กำลังโหลดข้อมูลสินค้า..." />
          )}

          {error && (
            <PageState type="error" message={error} onRetry={fetchProducts} />
          )}

          {!loading && !error && products.length === 0 && (
            <PageState type="empty" message="ยังไม่มีรายการสินค้าในระบบ" />
          )}

          {!loading && !error && products.length > 0 && (
            <ProductsList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
