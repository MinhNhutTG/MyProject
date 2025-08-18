module.exports.validatePost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!")
        res.redirect(req.get('Referer') || '/');
        return;
    }
    if (req.body.title.length < 5) {
        req.flash("error", "Vui lòng nhập tiêu đề sản phẩm dài hơn 5 kí tự !")
        res.redirect(req.get('Referer') || '/');
        return;
    }
    next();
}