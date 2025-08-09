// [GET] admin/products
const Prodcut = require("../../models/product.model");
module.exports.index = async (req, res) => {

    let fillerButton = [
        {
            name:"Tất cả",
            class: "active",
            status:""
        },
        {
            name:"Đang hoạt động",
            class: "",
            status:"active"
        },
        {
            name:"Ngưng hoạt động",
            class: "",
            status:"inactive"
        }
    ]

    

    if (req.query.status){
        const index = fillerButton.findIndex((btn)=>btn.status == req.query.status);
        fillerButton[index].class = "btn-success";
    }
    else{
        const index = fillerButton.findIndex((btn)=>btn.status == "");
        fillerButton[index].class = "btn-success";
    }

    let find = {
        deleted: false,
    }

    
    if (req.query.status){
        find.status = req.query.status;
    }

    let keyword = "";
    if (req.query.keyword){
        keyword=req.query.keyword;
        find.title = { $regex: keyword, $options: "i" };
    }

    const products = await Prodcut.find(find);
    res.render("./admin/pages/products/products.pug",{
        productsList:products,
        fillerButton:fillerButton,
        keyword: keyword,
    });
}