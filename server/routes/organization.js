const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createOrganization, getOrganization, updateOrganization } = require("../controllers/organization.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createOrganization);
authRouter.get("/", verifyAuth, getOrganization);
authRouter.put("/:id", verifyAuth, updateOrganization);

module.exports = authRouter;