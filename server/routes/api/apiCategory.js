const express = require('express');
const router = express.Router()
const ApiCategoryController = require('../../controller/api/category_controller')


router.get("/", ApiCategoryController.index);
router.get("/:id", ApiCategoryController.show);


module.exports = router