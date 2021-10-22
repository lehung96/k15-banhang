const express = require("express");
const router = express.Router();
const { listCategory,getCategoryCreate, postCategory,editCategory,UpdateCategory} = require("../controllers/CategoryController");

// router.get('/', listCategory);

router.get('/list-category',listCategory);
router.get('/create-category',getCategoryCreate);
router.post('/post-create',postCategory);


router.get("/edit-category/:id",editCategory);
router.post("/update-category",UpdateCategory)
router
module.exports = router;