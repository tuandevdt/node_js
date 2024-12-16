const express = require('express');
const router = express.Router()
const ApiAddressController = require('../../controller/api/address_controller')


router.get("/", ApiAddressController.index);
router.post("/create", ApiAddressController.create)

module.exports = router