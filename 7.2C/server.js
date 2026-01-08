const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));

const poll = {
  question: "What is your favourite snack?",
  options: ["Chips", "Chocolate", "Fruit"],
  votes: { Chips: 0, Chocolate: 0, Fruit: 0 }
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("pollData", poll);

  socket.on("vote", (option) => {
    if (poll.votes[option] === undefined) return;

    poll.votes[option] += 1;
    io.emit("pollResults", poll.votes);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
