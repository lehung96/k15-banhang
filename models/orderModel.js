const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
   ],
   total: {type: String},
   address: {type: Array, default: []},
   phone:{ type: Number },
   status:{
    type:String,
    enum:["canceled", "pending", "Complete"],
   },
   
},{
    collection:"order"
});


const OrderModel = mongoose.model("order", OrderSchema);

module.exports= OrderModel;