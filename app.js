const express = require('express')
const app = express();
const POST = 3000;
// khai báo app.set("view engine", "ejs"); cho nó biết mình đang sử dụng thư viện ejs
app.set("view engine", "ejs");
// thư mục views chứa layout của mình mình khai báo ra 
app.set("views", "./views");
  // sử dụng đường dẫn tĩnh path để nối các đường dẫn lại với nhau 
  const path = require('path'); 
  // Khai báo static file
app.use(express.static('assets'))
// khai báo một file cho khách hàng được phép truy cập nằm trong public
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//khai báo router user 
const UserRouter = require("./router/UserRouter");
//khai báo router user 
const ProductCodeRouter = require("./router/ProductCodeRouter");
const HomeAdminRouter = require("./router/HomeAdminRoter");
const CategoryRouter = require("./router/CategoryRouter");


// muốn sử dụng css thì phải public folder ra 
app.use('/public',express.static(path.join(__dirname, './public')));

app.use('/',HomeAdminRouter);

// sử dung đường dẫn UserRouter 
app.use('/api',UserRouter);
app.use('/',ProductCodeRouter);
app.use('/', CategoryRouter);






app.listen(POST, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server listen on " + POST);
})


