const express = require("express");
const cors = require("cors");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());
app.use(cors());

app.get("/dashboard", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/leads", (req, res) => {
  const { fullName, email, phone, company, jobTitle, leadStatus } = req.body;
  const query = `
    INSERT INTO leads (name, email, phone, company, job_title, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  pool.query(
    query,
    [fullName, email, phone, company, jobTitle, leadStatus],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting lead into database");
      } else {
        const newLead = result.rows[0];
        res.status(201).json(newLead);
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
