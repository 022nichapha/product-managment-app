import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// ตรวจสอบว่ามี DATABASE_URL หรือไม่ ถ้ามีให้ใช้ DATABASE_URL ก่อน
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // บังคับเปิด SSL สำหรับ Neon / Cloud DB
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // บังคับเปิด SSL สำหรับ Neon / Cloud DB
          },
        },
      },
    );

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL successful!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Tables Synchronized!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };
