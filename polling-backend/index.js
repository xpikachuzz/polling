const express = require("express");
const pollRouter = require("./routes/poll");
const app = express();    // initiate express.
const cors = require("cors");

// redis
const redisClient = require("./redis")
const { Server } = require("socket.io");
const { join_room, leave_room, vote_room, initializeUser } = require("./socket/socketControllers");
const authRouter = require("./routes/authRouter");
const { sessionMiddleWare, wrap } = require("./controllers/serverController");


const server = require("http").createServer(app);

const io = new Server(server, {
    cors: { origin:"http://localhost:5173", credentials: true },
});

redisClient.connect().catch(console.error)



app.use(express.json());
app.use(sessionMiddleWare)
app.use(cors({credentials: true, origin: "http://localhost:5173"}));

// if a GET request comes through the '/' path then pass the request throught the following chain of middleware functions.
app.use("/poll", pollRouter);
app.use("/auth", authRouter)



io.use(wrap(sessionMiddleWare))

io.on("connect", (socket) => {
  initializeUser(socket)
  // Join room open emission
  socket.on("poll_room_join", (id) => join_room(id, socket));
  socket.on("poll_room_leave", (id) => leave_room(id, socket));
  socket.on("poll_room_vote", (vote_data) => vote_room(vote_data, socket, io));
})


// io.of("/").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log("room, id: ", room, id)
// });

// io.of("/").adapter.on("leave-room", (room, id) => {
//   console.log(`socket ${id} has left room ${room}`);
// });



const PORT = process.env.PORT || 3000;

// Server will listen for incoming requests
server.listen(PORT, () => {
  console.log(`My first Express app - listening on port http://localhost:${PORT}/ !`);
});
