const express = require("express");
const app = express();
const cors = require("cors");
const error404 = require("./middlewares/404");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
const homeRouter=require('./routes/home')
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(cors());
app.use("/",homeRouter)
app.use("/api/v1/products", productsRouter);
app.use(express.static("./public"))
app.use(error404);
app.use(errorHandler);


const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on Port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
