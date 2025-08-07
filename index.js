const express = require('express'); // khai vao express
const route = require('./routes/client/index.routes')
const app = express(); // khoi tao app
const port = 3002;    // khai bao cong


// khai  báo view engine
app.set("views" ,"./views");
app.set("view engine","pug");

route(app)

app.use(express.static('public'));

app.listen(port,()=>{
    console.log("Connect Success!!")
})