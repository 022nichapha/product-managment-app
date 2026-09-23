import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default Product;
