// [GET] admin/products
const Product = require("../../models/product.model");
const helperFillterStatus = require("../../helpers/fillterStatus");
const helperSearch = require("../../helpers/search");
const helperPagination = require("../../helpers/pagination");
const pagination = require("../../helpers/pagination");

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

    const totalProduct = await Product.countDocuments(find)

    let objectPagination = helperPagination(
        {
        currentIndex:1,
        litmitProduct:8,
        totalProduct:totalProduct,
        },
        req.query
    ) 

    const products = await Product.find(find).limit(objectPagination.litmitProduct).skip(objectPagination.skip);
    res.render("./admin/pages/products/products.pug",{
        productsList:products,
        fillerButton:fillterStatus,
        keyword: objectSearch.keyword,
        pagination:objectPagination
        
    });
}

module.exports.changeStatus = async (req,res) => {
    console.log(req.params);
    const status = req.params.status;
    const idsp = req.params.id;

    console.log(`Gia tri can thay doi ${status} - ${idsp}`);
    await Product.updateOne({_id:idsp},{status:status});

   
    res.redirect(req.get('Referer') || '/');
}

module.exports.changeMulti = async  (req,res) => {
    
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type){
        case "active":
            await Product.updateMany({_id: {$in:ids}},{status:"active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in:ids}},{status:"inactive"});
            break;
        default:
            break;
    }
    res.redirect(req.get('Referer') || '/');
}