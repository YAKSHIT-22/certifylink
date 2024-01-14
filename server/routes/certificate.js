const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { sendCertificates } = require("../controllers/certificates.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, sendCertificates);
// authRouter.get("/", verifyAuth, getCertificates);

module.exports = authRouter;