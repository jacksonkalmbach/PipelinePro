const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const allEmployees = await pool.query("SELECT * FROM employees");
    res.json(allEmployees.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get an employee
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      "SELECT * FROM employees WHERE employee_id = $1",
      [id]
    );

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
