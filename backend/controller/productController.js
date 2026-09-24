import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, Image } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price are required fields" });
    }
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      Image,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};
const getallProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!id) {
      return res.status(400).json({ message: "product id is required" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product with ID  not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, Image } = req.body;
    if (!id) {
      return res.status(400).json({ message: "product id is required" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    if (description !== undefined) product.description = description;
    if (Image !== undefined) product.Image = Image;

    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();

    return res.status(200).json({ message: "product is deleteProduct" });
  } catch (error) {
    return next(error);
  }
};

export {
  createProduct,
  getallProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
