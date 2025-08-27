const express = require('express'); // khai vao express
var path = require('path');
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
const Cloudinary = require("./config/cloudinary");
const streamifier = require("streamifier");


database.connect();
const app = express();  // KHỞI TẠO APP


// [[ CLOUDINARY ]]

Cloudinary.Connect();

app.use(methodOverride("_method"));     // OVERRIDE PHUONG THUOC PATCH DELETED ....
app.use(bodyParser.urlencoded({ extended: false }))
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

// Tiny MCE // 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// === [DEFINE VIEW ENGINE ] === 
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// === [DEFINE PREFIXADMIN] === 
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// === [ROUTES] === 
routeAdmin(app)
route(app)

// === [DEFINE STATIC  ] === 
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log("Connect Success!!")
})