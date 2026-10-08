import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsForm from "../components/ProductsForm.jsx"; // 👈 เปลี่ยนมาใช้อันนี้
import { createProduct } from "../services/productService.js";

function AddProductPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await createProduct({
        name,
        price: Number(price),
        description,
        image,
      });
      alert("เพิ่มสินค้าสำเร็จ!");
      navigate("/products");
    } catch (err) {
      setError(err.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <main className="mx-auto max-w-2xl">
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <ProductsForm
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

export default AddProductPage;
