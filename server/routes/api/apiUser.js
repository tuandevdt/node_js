const express = require('express');

const router = express.Router()
const ApiUserController = require('../../controller/api/user_controller')


router.post("/register", ApiUserController.create);
router.post("/login", ApiUserController.login)
router.get("/", ApiUserController.index)
router.get("/me", ApiUserController.show)
router.post("/refreshToken", ApiUserController.refreshToken)



module.exports = router