const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/products.controller");
const multer = require('multer')
const uploadStream = require('../../helpers/uploadStream');
const productValidate = require("../../validates/admin/products.validate");
const flash = require('express-flash');

const upload = multer();

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/deleteItem/:id", controller.deleteItem);
router.get("/trash", controller.trash);
router.patch("/trash/restore/:id", controller.restore);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single('image'),
    async (req, res, next) => {
        try {
            const result = await uploadStream(req.file.buffer);
            req.body.thumbnail = result.secure_url;
            console.log("hi")
            next();
            
        } catch (error) {
            flash("Không thể tải ảnh này!!!");
        }
    },
    productValidate.validatePost,
    controller.createPost);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id", upload.single('image'),
    async (req, res, next) => {
        try {
            if (req.file) {
                const result = await uploadStream(req.file.buffer);
                req.body.thumbnail = result.secure_url;
            }
            next();
        } catch (error) {
            console.log("hi")
            flash("Không thể tải ảnh này!!!");
        }
    }
    , productValidate.validatePost, controller.editPost);
router.get("/detail/:id", controller.detail);
module.exports = router;