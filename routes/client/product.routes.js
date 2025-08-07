const productControler = require("../../controllers/client/product.controller")
const express = require('express');
const router = express.Router();

router.get("/", productControler.index)

module.exports = router