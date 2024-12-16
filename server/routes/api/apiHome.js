
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');

const ProductRoute = require('./apiProduct')
const UserRoute = require("./apiUser");
const CategoryRoute = require("./apiCategory")
const CartRoute = require("./apiCart")
const ReviewRoute = require("./apiReview")
const AddressRoute = require("./apiAddress")
const OrderRoute = require("./apiOrder")
const OrderItemRoute = require("./apiOrderItem")

router.use("/users", UserRoute)
router.use("/products", ProductRoute)
router.use("/categories", CategoryRoute)
router.use("/cart", CartRoute)
router.use("/reviews", ReviewRoute)
router.use("/addresses", AddressRoute)
router.use("/orders", OrderRoute)
router.use("/orderitem", OrderItemRoute)

module.exports = router