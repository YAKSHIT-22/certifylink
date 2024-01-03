const express = require("express");
const { createUser, loginUser, getUser, updateUser } = require("../controllers/user.js");
const { verifyAuth } = require("../middleware/auth.js");
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", createUser);
authRouter.get("/", verifyAuth, getUser);
authRouter.put("/update", verifyAuth, updateUser);

module.exports = authRouter;