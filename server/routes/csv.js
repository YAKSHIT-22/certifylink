const express = require("express");
const { verifyAuth } = require("../middleware/auth.js");
const { createCertificate, getCertificates, updateCertificates, deleteCertificates } = require("../controllers/csv.js");
const authRouter = express.Router();

authRouter.post("/", verifyAuth, createCertificate);
authRouter.get("/", verifyAuth, getCertificates);
authRouter.put("/:id", verifyAuth, updateCertificates);
authRouter.delete("/:id", verifyAuth, deleteCertificates);

module.exports = authRouter;