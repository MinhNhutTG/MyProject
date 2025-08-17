const express = require('express'); // khai vao express
const session = require('express-session');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.routes');
const database = require("./config/database")
const systemConfig = require("./config/systemconfig");
require('dotenv').config()

database.connect();

const app = express();  // KHỞI TẠO APP

app.use(methodOverride("_method"));     // OVERRIDE PHUONG THUOC PATCH DELETED ....

app.use(bodyParser.urlencoded({extended:false}))
const port = process.env.PORT;        // PORT


// === [FLASH MESSAGE] === 
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());


// === [DEFINE VIEW ENGINE ] === 
app.set("views" ,"./views");
app.set("view engine","pug");

// === [DEFINE PREFIXADMIN] === 
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// === [ROUTES] === 
routeAdmin(app)
route(app)


// === [DEFINE STATIC  ] === 
app.use(express.static('public')); 



app.listen(port,()=>{
    console.log("Connect Success!!")
})