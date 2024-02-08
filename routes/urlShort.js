const express = require("express");
const {
  generateURL,
  getAnalytics,
  updateUrl,
  deleteUrl,
  getUrl,
} = require("../controllers/urlShort");
const protect = require("../middlewares/auth");

const router = express.Router();

router.post("/", protect, generateURL);
router.get("/analytics/:shortId", protect, getAnalytics);
router.get("/", protect, getUrl);
router.patch("/update/:id", protect, updateUrl);
router.delete("/delete/:id", protect, deleteUrl);

module.exports = router;
