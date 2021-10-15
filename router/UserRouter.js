const router = require('express').Router();
 const UserModel = require('../models/userModel')


router.post('/register',(req, res,next)=>{
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role
    var avatar = req.body.avatar
    var address = req.body.address
    var email = req.body.email
    var phone = req.body.phone
   
    UserModel.findOne({
      username:username
    }).then(data=>{
        if(data){
            res.json('user này đã tồn tại ')
        }else{
         return UserModel.create({
          username:username,
          password:password,
          role:role,
          avatar:avatar,
          address:address,
          email:email,
          phone:phone,

          })
        }
    }) .then(data=>{
      res.json('Tạo tài khoản thành công');
    })
    .catch(err=>{
      res.status(500).json('Tạo tài khoản thất bại');
    })

  })

  // tạo chức năng đăng nhập
  router.post('/login',(req, res, next)=>{
    // gửi dữ liệu username và password
      var username = req.body.username
      var password = req.body.password

      // kiểm tra 
      UserModel.findOne({
        username:username,
        password:password
      }).then(data=>{
        // nếu có data
        if(data){
          res.json('đăng nhập thành công');
        }else{
          res.status(400).json('Account không đúng')
        }
      }).catch(err=>{
          res.status(500).json('có lỗi bên server')
      })
  })


module.exports= router;