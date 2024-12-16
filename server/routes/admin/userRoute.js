const express = require('express');

const router = express.Router()

const UserAdminController = require('../../controller/admin/user_controller')
router.get("/", UserAdminController.index);
router.post("/update/:id", UserAdminController.update)



module.exports = router