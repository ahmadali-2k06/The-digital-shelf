const renderHome = require("../controllers/home");
const express = require("express");

const router = new express.Router();
router.route("/").get(renderHome);

module.exports=router;