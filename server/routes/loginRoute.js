const express = require('express');

const router = express.Router()

const AuthAdminController = require('../controller/admin/auth_controller')
router.get("/", AuthAdminController.index);
router.post("/", AuthAdminController.login);
router.get("/register", AuthAdminController.register);
// router.post("/register", AuthAdminController.create);



module.exports = router