const express = require("express");
const { getAllproducts } = require("../controllers/products");

const router = express.Router();

router.get("/", getAllproducts);

module.exports = router;
