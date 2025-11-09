const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API działa poprawnie" });
});

module.exports = router;