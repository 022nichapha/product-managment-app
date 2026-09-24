import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AddProductPage from "./page/AddProductPage.jsx";
import EditProductPage from "./page/EditProductPage.jsx";
import ProductPage from "./page/productPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
