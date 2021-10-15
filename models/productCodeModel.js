const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const ProductCodeSchema = new Schema({
    productName:  { type:String },
    brand: { type:String },
    code: { type: Number },
    thumbnail: { type:String },
    categoryID:{
        type:String,
        ref:"category"
    }

},{
    collection:"productCode"
})

const ProductCodeModel = mongoose.model("productCode", ProductCodeSchema);
module.exports= ProductCodeModel;