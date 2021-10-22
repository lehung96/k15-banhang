const ProductCodeModel = require('../models/productCodeModel');
const formidable = require("formidable");
//multer
let multer  = require('multer');
/**
 * cấu hình storage
 * storage có nghĩa là bạn cấu hình coi cái hình up vào đâu, cụ thể ở đây là upload
 * vào public/upload/products
 */
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()  + "-" + file.originalname)
  }
}); 
/**
 * cấu hình upload
 * kiểm tra dung lượng file bao nhiêu mb và đuôi file là gì 
 */ 
let upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
      // console.log(file);
      if(file.mimetype=="image/jpg" || file.mimetype=="image/png" || file.mimetype=="image/bmp"|| file.mimetype=="image/gif" ){
          cb(null, true)
      }else{
          return cb(new Error('Only image are allowed!'))
      }
  }
}).single("thumbnail");



// //list productCode
// async function getProductCode(req, res){
//   try {
//     const list = await ProductCodeModel.find();
//     return res.render("backend/home.ejs",list);
//   } catch (error) {
//    res.json({status:500,message:"lỗi server", error})
//   }
// }

async function getProductCode (req, res){
  return res.render("admin/productCode/add");
  }




async function createProductCode (req, res){
  // upload file
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.json({status:500,message:"Đã xảy ra lỗi Multer khi tải lên"});
    } else if (err) {
      res.json({status:500,message:"Đã xảy ra lỗi không xác định khi tải lên", err});
    }else{
      // sever Mongo (req.file.filename)
      let productCodes = ProductCodeModel({
        productName: req.body.productName,
        brand: req.body.brand,
        code: req.body.code,
        thumbnail: req.file.filename,
        categoryID: req.body.categoryID,
        description: req.body.description,
      });
      productCodes.save(function(err){
          if(err){
            res.json({status:500,message:err});
          }else{
            res.redirect("./list-products")
            // res.json({message:'Tạo thành công', status:200});
          }
      })
    }
  });
  // try {
    //  await ProductCodeModel.create({
    //      productName:req.body.productName,
    //      brand:req.body.brand,
    //      code:req.body.code,
    //      thumbnail:req.body.thumbnail,
    //      categoryID:req.body.categoryID,
    //      description:req.body.description,
    //  });
    //  res.json({message:'Tạo thành công', status:200});
    // } catch (error) {
    //     res.json({status:500,message:"lỗi  server", error});
    // }
  }


// danh sách 
async function listProductCode (req, res){
  try {
    const allProductCode = await ProductCodeModel.find();
    // console.log(allProductCode);
    return res.render("admin/productCode/index",{allProductCode});
  } catch (error) {
   res.json({status:500,message:"lỗi server", error})
  }
}

// form Edit
async function editProductCode (req, res){
  try {
    const product_Code = await ProductCodeModel.findById( req.params.id);
    // console.log(product_Code);
    // lay thong tin chi tiet cua :id
    return res.render("admin/productCode/edit",{ product_Code})
  } catch (error) {
   res.json({status:500,message:"lỗi server", error})
  }
}

// update UpdateProductCode
async function UpdateProductCode (req, res){
  try {
    // (check khách hàng có chọn file mới không? )
   
    upload(req, res, function (err) {

        // 1. khach hàng không upload file mới  
        if(!req.file){
          ProductCodeModel.updateOne({_id: req.body.IDProduct_Code},{
            productName:req.body.productName,
            brand:req.body.brand,
            code:req.body.code,
            categoryID:req.body.categoryID,
            description:req.body.description,
          },(err)=>{
            if(err){
              res.json({status:500,message:err});
            }else{
              res.redirect("./list-products")
            }
          });
       }else{
                // console.log(req.body);
          // console.log(req.file);
          // 2. khách hàng upload file mới
        //  upload file
          if (err instanceof multer.MulterError) {
            res.json({status:500,message:"Đã xảy ra lỗi Multer khi tải lên"});
          } else if (err) {
            res.json({status:500,message:"Đã xảy ra lỗi không xác định khi tải lên", err});
          }else{
          //  update  Mongo (req.file.filename)
            ProductCodeModel.updateOne({_id: req.body.IDProduct_Code},{
              productName:req.body.productName,
              brand:req.body.brand,
              code:req.body.code,
              thumbnail:req.file.filename,
              categoryID:req.body.categoryID,
              description:req.body.description,
            },(err)=>{
              if(err){
                res.json({status:500,message:"Đã xảy ra lỗi Multer khi tải lên"});
              }else{
                res.redirect("./list-products")
              }
            });
          }
        }
    });
  } catch (error) {
   res.json({status:500,message:"lỗi server", error})
  }
}

// delete ProductCode

async function deleteProductCode (req, res){
  try {
     await ProductCodeModel.findOne({_id: req.body.IDProduct_Code
    }).then(data=>{
      if(data){
          res.json('vẫn đang có sản phẩm, bạn không được xóa')
      }else{
       return ProductCodeModel.deleteOne({
           _id: req.params.id
        })
      }
  }) .then(data=>{
    res.redirect("../list-products")
  })
  } catch (error) {
   res.json({status:500,message:"lỗi server", error})
  }
}

  module.exports = { createProductCode,getProductCode,listProductCode,editProductCode,UpdateProductCode,deleteProductCode };


