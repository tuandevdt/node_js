const express = require('express');

const router = express.Router()

const ReviewAdminController = require('../../controller/admin/review_controller')

router.get("/", ReviewAdminController.index);
router.get("/delete/:id", ReviewAdminController.delete)



module.exports = router