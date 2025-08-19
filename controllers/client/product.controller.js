
// ========= [[ CLIENT CONTROLLER PRODUCS]]
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


// ========= [[ CLIENT CONTROLLER DETAIL PRODUCT ]]

module.exports.detail = async (req,res)=>{
 
    let find = {
        deleted:false,
        slug: req.params.slug
    }
    const product = await  Product.findOne(find);
    res.render("./client/pages/products/detail.pug",{
        product:product
    });
}