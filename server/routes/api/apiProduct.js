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
const ApiProductController = require('../../controller/api/product_controller')


router.get("/", ApiProductController.index);
router.get("/:id", ApiProductController.show);
router.get("/categories/:id", ApiProductController.showByCategory)
// router.get("?productname=name", ApiProductController.showByName)


module.exports = router