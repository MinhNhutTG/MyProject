const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploadStream = require('../../helpers/uploadStream');
const controller = require("../../controllers/admin/products-category.controller");
const productValidate = require("../../validates/admin/products.validate");
const flash = require('express-flash');

const upload = multer();

router.get("/", controller.index);
router.get("/create",controller.create);
router.post("/create",
    upload.single('image'),
    async (req, res, next) => {
        try {
            const result = await uploadStream(req.file.buffer);
            req.body.thumbnail = result.secure_url;
            console.log(req.body.thumbnail)
            next();
            
        } catch (error) {
            console.log(error)
            flash("Không thể tải ảnh này!!!");
        }
    },
    controller.postCategory);
router.patch("/change-status/:status/:id",controller.changeStatus)
router.patch("/change-multi",controller.changeMultiCate);
router.get("/edit/:id",controller.edit)
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
router.delete("/delete/:id",controller.delete);
router.get("/detail/:id",controller.detail);
module.exports = router;
