const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploadStream = require('../../helpers/uploadStream');
const controller = require("../../controllers/admin/products-category.controller");

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
module.exports = router;
