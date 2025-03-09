const express = require("express");
const {validateController, loginPost, loginGet, signupPost} = require("../controllers/authControllers");



const authRouter = express();

authRouter.post("/login", validateController, loginPost);
authRouter.get("/login", loginGet)


authRouter.post("/register", validateController, signupPost);

module.exports = authRouter;
