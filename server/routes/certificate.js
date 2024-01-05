const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createCertificate, getCertificates } = require("../controllers/certificate.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createCertificate);
authRouter.get("/", verifyAuth, getCertificates);

module.exports = authRouter;