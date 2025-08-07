const express = require('express'); // khai vao express
const route = require('./routes/client/index.routes')
const database = require("./config/database")
require('dotenv').config()

database.connect();

const app = express(); // khoi tao app
const port = process.env.PORT;    // khai bao cong



// khai  báo view engine
app.set("views" ,"./views");
app.set("view engine","pug");

route(app)

app.use(express.static('public')); // sử dụng file tĩnh

app.listen(port,()=>{
    console.log("Connect Success!!")
})