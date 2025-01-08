const express = require("express");
const { logon, hello } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/logon", (req, res, next) => {
  console.log("[ROUTER] POST /logon");
  logon(req, res, next);
});

router.get("/hello", authMiddleware, (req, res, next) => {
  console.log("[ROUTER] GET /hello");
  hello(req, res, next);
});

module.exports = router;
