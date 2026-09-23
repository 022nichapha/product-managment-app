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
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = res.params;
    const { name, price, description, Image } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    }
    product.name = name || product.name;
    product.price = price ? Number(price) : product.price;
    product.description =
      description !== undefined ? description : product.description;
    product.Image = Image || product.Image;
    await product.save();
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const deleteProduct = async (req, res, next) => {};

export {
  createProduct,
  getallProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
