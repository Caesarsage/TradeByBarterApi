const express = require("express");
const router = express.Router({ mergeParams: true });

const reviews = require("../controllers/reviewController");
const { checkIfReviewAuthor, authenticateUser } = require("../middlewares/auth");

router.post("/", reviews.createReview);

router.delete("/:reviewId", authenticateUser, checkIfReviewAuthor, reviews.deleteReview);

module.exports = router;
