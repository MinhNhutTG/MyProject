// [GET] admin/products
const Prodcut = require("../../models/product.model");
const helperFillterStatus = require("../../helpers/fillterStatus");
const helperSearch = require("../../helpers/search");

module.exports.index = async (req, res) => {

    const fillterStatus = helperFillterStatus(req.query);

    let find = {
        deleted: false,
    }

    if (req.query.status){
        find.status = req.query.status;
    }

    const objectSearch = helperSearch(req.query);

    if (objectSearch.regex){
        find.title = objectSearch.regex;
    }

    const products = await Prodcut.find(find);
    res.render("./admin/pages/products/products.pug",{
        productsList:products,
        fillerButton:fillterStatus,
        keyword: objectSearch.keyword,
    });
}