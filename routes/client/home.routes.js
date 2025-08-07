const homeController = require("../../controllers/client/home.controller.js")
const express = require("express");
const router = express.Router();

router.get("/", homeController.index )

module.exports = router;