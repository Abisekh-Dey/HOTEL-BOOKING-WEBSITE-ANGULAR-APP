const express = require("express");
const reviewController = require("../controller/review_controller");

const router = express.Router();

router.post("/review", reviewController.createReview);
router.get("/review/:hotelId", reviewController.getReviewsByHotel);

module.exports = router;
