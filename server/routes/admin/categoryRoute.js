const express = require('express');

const router = express.Router()

const CategoryAdminController = require('../../controller/admin/category_controller')
router.get("/delete/:id", CategoryAdminController.delete)
router.get("/", CategoryAdminController.index);
router.get("/new", CategoryAdminController.new);
router.post("/add-category", CategoryAdminController.create);
router.get("/edit/:id", CategoryAdminController.edit);
router.post("/update/:id", CategoryAdminController.update)



module.exports = router