const express = require('express');
const router = express.Router();
const { listProductCode,createProductCode ,getProductCode,editProductCode,UpdateProductCode,deleteProductCode} = require("../controllers/ProductCodeController");


router.get("/add-productCode",getProductCode);
router.post("/add",createProductCode);
router.get("/list-products",listProductCode);

router.get("/edit-productCode/:id",editProductCode);
router.post("/update-productCode",UpdateProductCode);
router.get("/delete-productCode/:id", deleteProductCode);

module.exports= router;