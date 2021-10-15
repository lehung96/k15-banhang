const express = require('express')
const app = express()
const POST = 3000;
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//khai báo router user 
var UserRouter = require('./router/UserRouter')

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
// sử dung đường dẫn router 
app.use('/api',UserRouter)
app.listen(POST, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server listen on " + POST);
})