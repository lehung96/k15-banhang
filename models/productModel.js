const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    price: { type: Number },
    description: { type:String },
    color:  { type:String },
    size:   { type:String },
    quantity: { type: Number },
    thumbnail: { type:String },
    productCodeID:{
        type:String,
        ref:"productCode"
    }


},{
    collection:"product"
})

const ProductModel = mongoose.model("product", ProductSchema);
module.exports= ProductModel;