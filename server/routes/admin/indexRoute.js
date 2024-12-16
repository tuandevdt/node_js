const express = require('express');
const router = express.Router()

const AdminController = require('../../controller/admin/admin_controller')
const categoryRoute = require("./categoryRoute")
const productRoute = require("./productRoute")
const userRoute = require("./userRoute")
const reviewRoute = require("./reviewRoute")
const orderRoute = require("./orderRoute")

router.get("/", AdminController.index);
router.get("/checkToken", AdminController.checkToken)
router.use("/categories", categoryRoute)
router.use("/products", productRoute)
router.use("/users", userRoute)
router.use("/reviews", reviewRoute)
router.use("/orders", orderRoute)

module.exports = router
