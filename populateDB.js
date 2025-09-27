const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const products = require("./models/products");
const productsJson = require("./products.json");
require("dotenv").config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(
      console.log("Connection Successfull!")
    );
    await products.deleteMany({});
    console.log("Products Deleted Sucessfully");
    await products.insertMany(productsJson);
    console.log("Database populated successfully");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
start();
