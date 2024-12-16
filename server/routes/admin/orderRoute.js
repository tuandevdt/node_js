const express = require('express');

const router = express.Router()

const OrderAdminController = require('../../controller/admin/order_controller')

router.get("/", OrderAdminController.index);
router.get("/delete/:id", OrderAdminController.delete)
router.post("/update/:id", OrderAdminController.update)



module.exports = router