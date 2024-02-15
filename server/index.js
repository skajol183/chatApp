// Node Server which will handle socket io connection
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 5000 || process.env.PORT;

// Use an object to store user information with socket IDs as keys
const users = {};

app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
); // cors is used for inter communication between url
app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

const server = http.createServer(app);

// initializing io
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    console.log(`${name}(${socket.id}) is connected: `);
    socket.emit("welcome", name);
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} is disconnected`);
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(port, () => {
  console.log(`Working`);
});
