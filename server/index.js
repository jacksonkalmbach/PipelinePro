const http = require("http");
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { Server } = require("socket.io");

const app = express();
// app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io //

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new-lead", () => {
    io.emit("update-leads");
  });

  socket.on("delete-lead", () => {
    io.emit("update-leads");
  });

  socket.on("sign-in", () => {
    console.log("user signed in");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const usersRouter = require("./routes/users");
const leadsRouter = require("./routes/leads");
const notesRouter = require("./routes/notes");
const employeesRouter = require("./routes/employees");
const eventRouter = require("./routes/events");
const chatRouter = require("./routes/chat");
const companyRouter = require("./routes/company");

app.use(cors());
app.use(express.json());

// ROUTES //

app.use("/users", usersRouter);
app.use("/leads", leadsRouter);
app.use("/notes", notesRouter);
app.use("/employees", employeesRouter);
app.use("/events", eventRouter);
app.use("/chat", chatRouter);
app.use("/company", companyRouter);

server.listen(5001, () => {
  console.log("Server is running on port 5001");
});
