const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createTemplate, getTemplates } = require("../controllers/template.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createTemplate);
authRouter.get("/", verifyAuth, getTemplates);

module.exports = authRouter;