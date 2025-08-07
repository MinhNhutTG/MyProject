module.exports.index = (req, res) => {
    res.render("./client/pages/products/index.pug",{
        titlePage:"Trang danh sách sản phẩm"

    });
}