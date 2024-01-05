const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createOrganization, getOrganization, updateOrganization, deleteOrganization } = require("../controllers/organization.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createOrganization);
authRouter.get("/", verifyAuth, getOrganization);
authRouter.put("/:id", verifyAuth, updateOrganization);
authRouter.delete("/:id", verifyAuth, deleteOrganization);

module.exports = authRouter;