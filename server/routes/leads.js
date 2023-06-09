const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a lead
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      companyId,
      jobTitle,
      leadStatus,
      leadOwner,
    } = req.body;
    const newLead = await pool.query(
      "INSERT INTO leads (first_name, last_name, email, phone, company_id, job_title, lead_status, lead_owner) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        firstName,
        lastName,
        email,
        phone,
        companyId,
        jobTitle,
        leadStatus,
        leadOwner,
      ]
    );

    res.json(newLead.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all leads
router.get("/", async (req, res) => {
  try {
    const allLeads = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC"
    );
    res.json(allLeads.rows);
  } catch (err) {
    console.error(`Error getting all leads, ${err.message}`);
  }
});

// Get a lead
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await pool.query(
      "SELECT leads.*, companies.company_name FROM leads JOIN companies ON leads.company_id = companies.id WHERE leads.id = $1",
      [id]
    );

    res.json(lead.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all leads for employee id
router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const leads = await pool.query(
      "SELECT * FROM leads WHERE lead_owner = $1",
      [id]
    );
    res.json(leads.rows);
  } catch (error) {
    console.log(`Error fetching leads for employee, ${error}`);
  }
});

// Update a lead
router.put("/:id", async (req, res) => {
  try {
    console.log("req body", req.body);
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle, leadStatus } =
      req.body;
    const updateLead = await pool.query(
      "UPDATE leads SET first_name = $1, last_name = $2, email = $3, phone = $4, company_id = $5, job_title = $6, lead_status = $7 WHERE id = $8",
      [firstName, lastName, email, phone, company, jobTitle, leadStatus, id]
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
    const deleteLead = await pool.query("DELETE FROM leads WHERE id = $1", [
      id,
    ]);
    res.json("Lead was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
