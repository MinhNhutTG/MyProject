
const Category = require("../../models/category.model");
const helperFillterStatus = require("../../helpers/fillterStatus");
const helperPagination = require("../../helpers/pagination");
const helperSearch = require("../../helpers/search");
const flash = require("express-flash");

// ===== [[ GET // CONTROLLER CATEGORY]] 
module.exports.index = async (req, res) => {

    const fillterStatus = helperFillterStatus(req.query);

    let find = {
        deleted: false,
    }

    const totalProduct = await Category.countDocuments(find)

    let objectPagination = helperPagination(
        {
            currentIndex: 1,
            litmitProduct: 8,
            totalProduct: totalProduct,
        },
        req.query
    )

    if (req.query.status){
        find.status = req.query.status;
    }

    const objectSearch = helperSearch(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    let sort = {};

    if (req.query.keysort && req.query.valuesort){
        sort[req.query.keysort] = req.query.valuesort;
    }
    else{
        sort.position = "desc";
    }



    const category = await Category.find(find).sort(sort).limit(objectPagination.litmitProduct).skip(objectPagination.skip);
    res.render("./admin/pages/products/product-category.pug", {
        category: category,
        fillerButton: fillterStatus,
        pagination: objectPagination,
        keyword: objectSearch.keyword,
    });
}

// ===== [[ GET // CONTROLLER CREATE]] 
module.exports.create = (req, res) => {
    res.render("./admin/pages/products/product-category-create.pug");
}


// ===== [[ POST // CONTROLLER CREATE]] 
module.exports.postCategory = async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    req.flash("success", "Thêm danh mục thành công");
    res.redirect("/admin/category");
}

// ===== [[ PATCH // CONTROLLER CREATE]] 
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Category.updateOne({ _id: id }, { status: status });
    req.flash("success", "Thay đổi trạng thái danh mục thành công");
    res.redirect("/admin/category")
}

// [[CHANGE MULTI]]
module.exports.changeMultiCate = async (req,res)=>{
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
            await Category.updateMany({ _id: { $in: ids } }, { status: "active" });
            req.flash("success", "Cập nhật trạng thái nhiều sản phẩm thành công!");
            break;
        case "inactive":
            await Category.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash("success", "Cập nhật trạng thái nhiều sản phẩm thành công!");
            break;
        case "deleteAll":
            await Category.updateMany({ _id: { $in: ids } }, { deleted: true, deleteAt: new Date().toLocaleString() })
            req.flash("success", "Xóa nhiều sản phẩm thành công!");
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");

                position = parseInt(position);

                await Category.updateOne({ _id: id }, { position: position });


            }
            req.flash("success", "Thay đổi vị trí nhiều sản phẩm thành công!");
            break;
        default:
            break;

    }
    res.redirect(req.get('Referer') || '/');
}