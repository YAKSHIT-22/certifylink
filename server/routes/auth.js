const express = require("express");
const { createUser, loginUser, getUser, updateUser, logoutUser } = require("../controllers/user.js");
const { verifyAuth } = require("../middleware/auth.js");
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", createUser);
authRouter.get("/", verifyAuth, getUser);
authRouter.put("/update", verifyAuth, updateUser);
authRouter.get("/signout", logoutUser);

module.exports = authRouter;