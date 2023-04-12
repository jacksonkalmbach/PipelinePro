const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "1129",
  host: "localhost",
  port: 5432,
  database: "crm",
});

module.exports = pool;
