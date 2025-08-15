const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position:"desc"})  //- tim tat ca 

    res.render("./client/pages/products/index.pug",{
        titlePage:"Trang danh sách sản phẩm",
        products: products
    });
}