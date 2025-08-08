// [GET] admin/products
const Prodcut = require("../../models/product.model");
module.exports.index = async (req, res) => {
    const products = await Prodcut.find({});
    res.render("./admin/pages/products/products.pug",{
        productsList:products
    });
}