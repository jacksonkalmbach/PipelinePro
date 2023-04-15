const http = require("http");
const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const pool = require("./db");
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

// ROUTES //

// Create a lead
app.post("/leads", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, jobTitle, leadStatus } =
      req.body;
    const newLead = await pool.query(
      "INSERT INTO leads (first_name, last_name, email, phone, company, job_title, lead_status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, email, phone, company, jobTitle, leadStatus]
    );

    res.json(newLead.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all leads
app.get("/leads", async (req, res) => {
  try {
    const allLeads = await pool.query("SELECT * FROM leads");
    res.json(allLeads.rows);
  } catch (err) {
    console.error(`Error getting all leads, ${err.message}`);
  }
});

// Get a lead
app.get("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await pool.query("SELECT * FROM leads WHERE lead_id = $1", [
      id,
    ]);

    res.json(lead.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a lead
app.put("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      phone,
      company,
      job_title,
      lead_status,
    } = req.body;
    const updateLead = await pool.query(
      "UPDATE leads SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, job_title = $6, lead_status = $7 WHERE lead_id = $8",
      [first_name, last_name, email, phone, company, job_title, lead_status, id]
    );

    res.json("Lead was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a lead
app.delete("/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteLead = await pool.query(
      "DELETE FROM leads WHERE lead_id = $1",
      [id]
    );
    res.json("Lead was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// SOCKET.IO //
// io.on("connection", (socket) => {
//   socket.on("newLead", (data) => {
//     io.emit("newLead", data);
//   });
// });

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
