require("dotenv").config();
const app = require("./src/app");
const { Server } = require("socket.io");
const connectDB = require("./src/db/db");
const http = require("http");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

connectDB();

server.listen(3000, () => {
  console.log("Server with WebSockets running on port 3000");
});
