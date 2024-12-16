const express = require('express');
const router = express.Router()
const ApiOrderController = require('../../controller/api/order_controller')


router.get("/", ApiOrderController.index);
router.get("/:id", ApiOrderController.show);
router.post("/create", ApiOrderController.create)
router.patch("/update/:id", ApiOrderController.update)

module.exports = router