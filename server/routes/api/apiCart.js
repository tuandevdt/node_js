const express = require('express');
const router = express.Router()
const ApiCartController = require('../../controller/api/cart_controller')


router.get("/", ApiCartController.index);
router.post("/", ApiCartController.create)
router.patch("/update/:id", ApiCartController.update)
router.delete("/delete/:id", ApiCartController.delete)

module.exports = router