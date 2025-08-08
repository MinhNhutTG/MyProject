const express = require("express");
const router = express.Router();
const dashBoardController =  require("../../controllers/admin/dashboard.controller");
router.get("/",dashBoardController.dashboard);
module.exports = router;