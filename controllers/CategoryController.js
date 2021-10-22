const CategoryModel = require('../models/categoryModel');


async function listCategory (req, res){
    try {
        const allCategory = await CategoryModel.find();
        // console.log(allProductCode);
        return res.render("admin/category/index",{allCategory});
      } catch (error) {
       res.json({status:500,message:"lỗi server", error})
      }
    //return res.send("đây là trang danh sách phân loại");
 };


 async function getCategoryCreate (req, res){
    return res.render("admin/category/add");
 }

//  async function postCategory (req, res){
//      console.log(req.body);
//      return res.send("post category from server")
//  }


async function postCategory (req, res,next){
    var categoryName = req.body.categoryName
    try {
        await CategoryModel.findOne({
            categoryName:categoryName
        }).then(data=>{
            if(data){
                res.json("tên danh mục này đã tồn tại")
            }else{
                return CategoryModel.create({
                    categoryName:categoryName
                })
            }
        })
        res.redirect("./list-category");
    } catch (error) {
        res.json({status:500, message:"lỗi server", error});
    }
}


 // form Edit
async function editCategory (req, res){
    try {
      const categorys = await CategoryModel.findById( req.params.id);
      // console.log(product_Code);
      // lay thong tin chi tiet cua :id
      return res.render("admin/category/edit",{ categorys})
    } catch (error) {
     res.json({status:500,message:"lỗi server", error})
    }
  }

  //update Category

  async function UpdateCategory (req, res){
    try {
        CategoryModel.updateOne({_id: req.body.IDCategory},{
            categoryName: req.body.categoryName,
    
          },(err)=>{
            if(err){
              res.json({status:500,message:err});
            }else{
              res.redirect("./list-category")
            }
          });
    } catch (error) {
        res.json({status:500,message:"lỗi server", error})
    }
  }

module.exports = {listCategory,getCategoryCreate, postCategory,editCategory, UpdateCategory};