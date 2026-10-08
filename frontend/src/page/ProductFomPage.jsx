import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageState from "../components/PageState.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductHeader from "../components/ProductHeader.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productService.js";

function ProductFormPage({ isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadProduct = async () => {
      try {
        const product = await getProduct(id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description ?? "");
        setImage(product.image ?? "");
      } catch (requestError) {
        setError(requestError.message);
        showError(requestError);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !price) {
      showError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const product = {
        name,
        price: Number(price),
        description: description || null,
        image: image || null,
      };
      if (isEditing) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      await showSuccess(isEditing ? "แก้ไขสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ");
      navigate("/products");
    } catch (requestError) {
      showError(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />
        <PageState loading={loading} error={error} />
        {!loading && !error && (
          <ProductForm
            editingId={isEditing ? id : null}
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
        )}
      </div>
    </main>
  );
}

export default ProductFormPage;
