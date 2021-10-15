const mongoose = require("./connectDB");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type:String },
    role: { type:String },
    avatar: { type:String },
    address: {type: Array, default: []},
    email:{ type:String },
    phone:{ type: Number },

},{
    collection:"user"
});


const UserModel = mongoose.model("user", UserSchema);

module.exports= UserModel;