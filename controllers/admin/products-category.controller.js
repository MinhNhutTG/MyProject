
const Category = require("../../models/category.model");
const helperFillterStatus = require("../../helpers/fillterStatus");
const helperPagination  = require("../../helpers/pagination")

// ===== [[ GET // CONTROLLER CATEGORY]] 
module.exports.index = async (req,res)=>{

    const fillterStatus = helperFillterStatus(req.query);

    let find = {
        deleted:false,
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

    const category = await Category.find({deleted:false}).limit(objectPagination.litmitProduct).skip(objectPagination.skip);
    res.render("./admin/pages/products/product-category.pug",{
        category:category,
        fillerButton:fillterStatus,
        pagination: objectPagination
    });
}

// ===== [[ GET // CONTROLLER CREATE]] 
module.exports.create = (req,res)=>{
    res.render("./admin/pages/products/product-category-create.pug");
}


 // ===== [[ POST // CONTROLLER CREATE]] 
module.exports.postCategory = async (req,res)=>{
    const category = new Category(req.body);
    await category.save();
    req.flash("success","Thêm danh mục thành công");
    res.redirect("/admin/category");
}



 // ===== [[ PATCH // CONTROLLER CREATE]] 
module.exports.changeStatus = async (req,res)=>{
   const status = req.params.status;
   const id = req.params.id;

   await Category.updateOne({_id:id},{status:status});
   res.redirect("/admin/category")
}