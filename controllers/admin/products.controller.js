// [GET] admin/products
const config = require("../../config/systemconfig")
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const helperFillterStatus = require("../../helpers/fillterStatus");
const helperCreateTree = require("../../helpers/create-tree");
const helperSearch = require("../../helpers/search");
const helperPagination = require("../../helpers/pagination");
const pagination = require("../../helpers/pagination");

//========== [[ INDEX ]] =============
module.exports.index = async (req, res) => {

    const fillterStatus = helperFillterStatus(req.query);

    let find = {
        deleted: false,
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    const objectSearch = helperSearch(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    const totalProduct = await Product.countDocuments(find)

    let objectPagination = helperPagination(
        {
            currentIndex: 1,
            litmitProduct: 8,
            totalProduct: totalProduct,
        },
        req.query
    )

    let sort = {};

    if (req.query.keysort && req.query.valuesort){
        sort[req.query.keysort] = req.query.valuesort;
    }
    else{
        sort.position = "desc"
    }



    const products = await Product.find(find).sort(sort).limit(objectPagination.litmitProduct).skip(objectPagination.skip);
    res.render("./admin/pages/products/products.pug", {
        productsList: products,
        fillerButton: fillterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}


//========== [[ CONTROLLER CHANGE STATUS ]] =============
module.exports.changeStatus = async (req, res) => {

    const status = req.params.status;
    const idsp = req.params.id;


    await Product.updateOne({ _id: idsp }, { status: status });

    req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");

    res.redirect(req.get('Referer') || '/');
}


//========== [[ CONTROLLER CHANGE MULTI STATUS AND DELETE ]] =============
module.exports.changeMulti = async (req, res) => {

    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", "Cập nhật trạng thái nhiều sản phẩm thành công!");
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", "Cập nhật trạng thái nhiều sản phẩm thành công!");
            break;
        case "deleteAll":
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deleteAt: new Date().toLocaleString() })
            req.flash("success", "Xóa nhiều sản phẩm thành công!");
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");

                position = parseInt(position);

                await Product.updateOne({ _id: id }, { position: position });


            }
            req.flash("success", "Thay đổi vị trí nhiều sản phẩm thành công!");
            break;
        default:
            break;

    }
    res.redirect(req.get('Referer') || '/');
}


//========== [[ CONTROLLER DELETE PRODUCT ]] =============
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date().toLocaleString()
    })

    req.flash("success", "Xóa sản phẩm thành công!");

    res.redirect(req.get('Referer') || '/');
}


//==========[[ CONTROLLER TRASH INDEX ]] ============
module.exports.trash = async (req, res) => {
    let find = {
        deleted: true
    }
    const productDeleted = await Product.find(find);

    res.render("./admin/pages/products/trash.pug", {
        productDeleted: productDeleted
    });
}


//==========[[ CONTROLLER RESTORE ]] ============
module.exports.restore = async (req, res) => {
    const id = req.params.id;

    await Product.updateOne({ _id: id }, { deleted: false });

    res.redirect(req.get('Referer') || '/');
}


// ========= [[CONTROLLER CREATE PRODUCT INDEX]]========
module.exports.create = async (req, res) => {

    const category = await Category.find({deleted:false});
    const newCategory = helperCreateTree.tree(category)
    res.render('./admin/pages/products/create.pug',{
        category:newCategory
    });
}


// ========= [[CONTROLLER CREATE PRODUCT POST]]========

module.exports.createPost = async (req, res) => {

    req.body.price = Number(req.body.price);
    req.body.discount = Number(req.body.discount);
    req.body.stock = Number(req.body.stock);

    if (req.body.position == "") {
        const total = parseInt(await Product.countDocuments()) + 1;
        req.body.position = total;
    }
    else {
        req.body.position = Number(req.body.position);
    }
    
    console.log(req.body.parent_category_id)
  
    const product = new Product(req.body);

    await product.save();

    req.flash("success", "Thêm sản phẩm thành công");

    res.redirect(`${config.prefixAdmin}/products`);
}


// ========= [[ GET //  CONTROLLER RENDER EDIT PAGE ]] =====
module.exports.edit = async (req, res) => {

    let find = {
        deleted: false,
        _id: req.params.id
    }
    const data = await Product.findOne(find);
    console.log(data)

    const category = await Category.find({deleted:false});
    const newCategory = helperCreateTree.tree(category)
    console.log(newCategory)
    res.render("./admin/pages/products/edit.pug", {
        product: data,
        category:newCategory
    }
    );
}



// ========= [[ PUT //  CONTROLLER PUT PRODUCT ]] =====
module.exports.editPost = async (req, res) => {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect('/admin/products');
}


// ====== [[ GET // CONTROLLER GET DETAIL PRODUCT ]] =====
module.exports.detail = async (req,res)=>{
    
    let find = {
        deleted:false,
        _id: req.params.id
    }
    
    const product = await Product.findOne(find);

    res.render("./admin/pages/products/detail.pug",{
        product:product
    });
}

