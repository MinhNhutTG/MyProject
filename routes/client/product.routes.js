const productControler = require("../../controllers/client/product.controller")
const express = require('express');
const router = express.Router();

router.get("/", productControler.index)
router.get("/:slug",productControler.detail)
module.exports = router