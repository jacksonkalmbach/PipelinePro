const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a lead
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const allLeads = await pool.query("SELECT * FROM leads");
    res.json(allLeads.rows);
  } catch (err) {
    console.error(`Error getting all leads, ${err.message}`);
  }
});

// Get a lead
router.get("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
