const http = require("http");
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const leadsRouter = require("./routes/leads");
const notesRouter = require("./routes/notes");
const employeesRouter = require("./routes/employees");
const eventRouter = require("./routes/calendar/events");

app.use(cors());
app.use(express.json());

// SOCKET.IO //
io.on("connection", (socket) => {
  console.log("socket id", socket.id);
  socket.on("new-lead", (lead) => {
    console.log("new lead - server file", lead);
    io.emit("new-lead", lead);
  });

  socket.on("delete-lead", (lead) => {
    io.emit("delete-lead", lead);
  });
});

// ROUTES //

app.use("/leads", leadsRouter);
app.use("/notes", notesRouter);
app.use("/employees", employeesRouter);
app.use("/events", eventRouter);

server.listen(5001, () => {
  console.log("Server is running on port 5001");
});
