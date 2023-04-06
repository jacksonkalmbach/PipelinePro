require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// define the data for the new lead
const lead = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "555-555-5555",
  company: "XYZ Corporation",
  job_title: "Marketing Manager",
  status: "New",
};

// construct the SQL query to insert the new lead into the database
const query = `
  INSERT INTO leads (name, email, phone, company, job_title, status)
  VALUES ($1, $2, $3, $4, $5, $6)
`;

// execute the query with the data for the new lead
pool.query(
  query,
  [
    lead.name,
    lead.email,
    lead.phone,
    lead.company,
    lead.job_title,
    lead.status,
  ],
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("New lead inserted successfully");
    }
    pool.end();
  }
);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
