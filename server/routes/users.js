const express = require("express");
const router = express.Router();
const pool = require("../db");

// Create a user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, createdAt } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, password, createdAt]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id from get user", id);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(`Error getting user, ${err.message}`);
  }
});

// Get all users by department
router.get("/department/:department", async (req, res) => {
  try {
    const { department } = req.params;
    const users = await pool.query(
      "SELECT * FROM users WHERE department = $1",
      [department]
    );
    res.json(users.rows);
  } catch (err) {
    console.error(`Error getting users by department, ${err.message}`);
  }
});

// Get all users by company
router.get("/company/:company", async (req, res) => {
  try {
    const { company } = req.params;
    const users = await pool.query(
      "SELECT * FROM users WHERE company_id = $1",
      [company]
    );
    res.json(users.rows);
  } catch (err) {
    console.error(`Error getting users by company, ${err.message}`);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(`Error getting all users, ${err.message}`);
  }
});

module.exports = router;
