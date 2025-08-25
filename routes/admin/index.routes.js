const systemConfig = require("../../config/systemconfig");
const dashboardRoutes = require("./dashboard.routes");
const productsRoutes = require("./products.routes");
const productCategory = require("./product-category.routes")
module.exports = (app) => {
    const ADMIN_PATH = systemConfig.prefixAdmin;
    app.use( ADMIN_PATH+"/dashboard", dashboardRoutes );
    app.use( ADMIN_PATH+"/products", productsRoutes );
    app.use( ADMIN_PATH+"/category", productCategory );
}