const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    categoryName:{ type:String },

},{
    collection:"category"
});


const CategoryModel = mongoose.model("category", CategorySchema);

module.exports= CategoryModel;