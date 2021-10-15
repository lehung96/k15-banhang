const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userID:{
        type:String,
        ref:"user"
    },
    listProduct:[
        {
            productID:{
                type:String,
                ref:"product"
            },
            quantity: Number
        }
   ]
},{
    collection:"cart"
});


const CartModel = mongoose.model("cart", CartSchema);

module.exports= CartModel;