const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

//welcome page
router.get("/", (req, res) => res.render("../views/welcome"));

//Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("../views/dashboard", { user: req.user })
);

module.exports = router;
