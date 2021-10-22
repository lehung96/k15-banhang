const express = require('express');
const router = express.Router();
const {  getHomeAdmin } = require("../controllers/HomeAdminController");


router.get("/", getHomeAdmin);

module.exports= router;
