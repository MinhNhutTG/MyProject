const express = require('express'); // khai vao express
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.routes');
const database = require("./config/database")
const systemConfig = require("./config/systemconfig");
require('dotenv').config()

database.connect();

const app = express(); // khoi tao app
const port = process.env.PORT;    // khai bao cong



// khai  báo view engine
app.set("views" ,"./views");
app.set("view engine","pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

routeAdmin(app)
route(app)


app.use(express.static('public')); // sử dụng file tĩnh

app.listen(port,()=>{
    console.log("Connect Success!!")
})