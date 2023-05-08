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

app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname + "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// Socket.io //

io.on("connection", (socket) => {
  socket.on("new-lead", () => {
    io.emit("update-leads");
  });

  socket.on("delete-lead", () => {
    io.emit("update-leads");
  });

  socket.on("sign-in", () => {
    console.log("user signed in");
  });

  socket.on("new-note", () => {
    io.emit("update-notes");
  });

  socket.on("delete-note", () => {
    io.emit("update-notes");
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

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
