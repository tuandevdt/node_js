const express = require('express');
const router = express.Router()
const ApiOrderItemController = require('../../controller/api/orderitem_controller')


router.get("/", ApiOrderItemController.index);
// router.get("/:id", ApiOrderItemController.show);
router.post("/create", ApiOrderItemController.create)

module.exports = router