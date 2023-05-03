const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a company
router.post("/", async (req, res) => {
  try {
    const { name, address, city, state, zip, phone, createdAt } = req.body;
    const newCompany = await pool.query(
      "INSERT INTO companies (name, address, city, state, zip, phone, created_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, address, city, state, zip, phone, createdAt]
    );

    res.json(newCompany.rows[0]);
  } catch (err) {
    console.error("error creating company", err.message);
  }
});

// Get a company
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await pool.query("SELECT * FROM companies WHERE id = $1", [
      id,
    ]);
    res.json(company.rows[0]);
  } catch (err) {
    console.error(`Error getting company, ${err.message}`);
  }
  console.log("res body", res);
});

module.exports = router;
