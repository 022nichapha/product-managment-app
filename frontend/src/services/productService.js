const API_URL = `${import.meta.env.VITE_API_URL}/api/product`;

const request = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
  }
  return response.json();
};

const getProduct = () => request(API_URL);

const getProductById = (id) => request(`${API_URL}/${id}`);

const createProduct = (product) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
const deleteProduct = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
