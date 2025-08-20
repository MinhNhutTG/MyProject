const Product = require("../../models/product.model");
module.exports.index = async  (req, res) => {
    let find = {
        deleted:false,
    }
    const products = await Product.find(find).sort("desc");
    res.render("./client/pages/home/index.pug",{
        titlePage:"Trang chủ",
        products:products
    });
}