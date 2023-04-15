const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const pool = require("./db");
const server = http.createServer(app);
const io = socketio(server);
const leadsRouter = require("./routes/leads");
const notesRouter = require("./routes/notes");

app.use(cors());
app.use(express.json());

// ROUTES //

app.use("/leads", leadsRouter);
app.use("/notes", notesRouter);

// SOCKET.IO //
// io.on("connection", (socket) => {
//   socket.on("newLead", (data) => {
//     io.emit("newLead", data);
//   });
// });

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
