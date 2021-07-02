const express = require("express");
const router = express.Router({ mergeParams: true });

const reviews = require("../controllers/reviewController");

router.post("/", reviews.createReview);

router.delete(
  "/:reviewId",reviews.deleteReview
);

module.exports = router;
