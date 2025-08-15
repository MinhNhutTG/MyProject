const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");

router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/deleteItem/:id",controller.deleteItem);
router.get("/trash",controller.trash);
router.patch("/trash/restore/:id",controller.restore);
module.exports = router;