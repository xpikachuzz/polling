const express = require("express");
const { createPollPOST, pollGET } = require("../controllers/pollControllers");


const pollRouter = express();

pollRouter.post("/create", createPollPOST);
// pollRouter.post("/login", validateController, rateLimiter(60, 10), loginPost);
pollRouter.get("/:pollId", pollGET)

module.exports = pollRouter;