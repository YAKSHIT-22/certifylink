const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createTemplate, getTemplates } = require("../controllers/template.js");
const authRouter = express.Router();

authRouter.post("/", createTemplate);
authRouter.get("/", getTemplates);

module.exports = authRouter;