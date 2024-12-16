const express = require('express');
const router = express.Router()
const ApiReviewController = require('../../controller/api/review_controller')


router.get("/", ApiReviewController.index);
router.get("/:id", ApiReviewController.show);
router.post("/create", ApiReviewController.create)
router.patch("/update/:id", ApiReviewController.update)
router.delete("/delete/:id", ApiReviewController.delete)

module.exports = router