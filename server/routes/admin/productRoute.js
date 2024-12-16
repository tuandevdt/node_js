const express = require('express');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
var upload = multer({ storage: storage });
const router = express.Router()

const ProductAdminController = require('../../controller/admin/products_controller')

router.get("/", ProductAdminController.index);
router.get("/new", ProductAdminController.new);
router.post("/add-product", upload.single('image'), ProductAdminController.create);
router.get("/edit/:id", ProductAdminController.edit)
router.post("/update/:id", upload.single('image'), ProductAdminController.update)
router.get("/delete/:id",ProductAdminController.delete)


module.exports = router