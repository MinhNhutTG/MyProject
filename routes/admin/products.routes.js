const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer  = require('multer')
const storageMulterHelper = require('../../helpers/storageMulter');
const productValidate = require("../../validates/admin/products.validate");

const upload = multer({ storage: storageMulterHelper() })

router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/deleteItem/:id",controller.deleteItem);
router.get("/trash",controller.trash);
router.patch("/trash/restore/:id",controller.restore);
router.get("/create",controller.create);
router.post(
    "/create",
    upload.single('image'),
    productValidate.validatePost,
    controller.createPost);
module.exports = router;