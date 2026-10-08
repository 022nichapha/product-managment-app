import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductsForm from "../components/ProductsForm.jsx";
import PageState from "../components/PageState.jsx";
import { getProductById, updateProduct } from "../services/productService.js";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setName(data.name || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setImage(data.image || "");
      } catch (err) {
        setError(err.message || "ไม่สามารถโหลดข้อมูลสินค้าได้");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await updateProduct(id, {
        name,
        price: Number(price),
        description,
        image,
      });
      alert("แก้ไขข้อมูลสินค้าสำเร็จ!");
      navigate("/products");
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 p-6">
        <main className="mx-auto max-w-2xl">
          <PageState type="loading" message="กำลังดึงข้อมูลสินค้า..." />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <main className="mx-auto max-w-2xl">
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <ProductsForm
          editingId={id}
          name={name}
          price={price}
          description={description}
          image={image}
          isSubmitting={isSubmitting}
          onNameChange={setName}
          onPriceChange={setPrice}
          onDescriptionChange={setDescription}
          onImageChange={setImage}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/products")}
        />
      </main>
    </div>
  );
}

export default EditProductPage;
