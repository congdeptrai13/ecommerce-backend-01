const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const app = express();

mongoose.connect(process.env.MONGO_URL, () => console.log("database is connected"));
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//to serve images inside public folder
app.use("/images", express.static('public/images'))

app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController)

app.listen(process.env.PORT, () => console.log(`server has bben started successfully on port ${process.env.PORT}`))