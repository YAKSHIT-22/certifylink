const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { getDashboardData } = require("../controllers/dashboard.js");
const authRouter = express.Router();

authRouter.get("/", verifyAuth, getDashboardData);

module.exports = authRouter;