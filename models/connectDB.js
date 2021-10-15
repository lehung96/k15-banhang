const mongoose = require('mongoose');

// tạo liên kết với mongoDB Trong my computer
mongoose.connect('mongodb://localhost/banhangDB');


module.exports= mongoose;