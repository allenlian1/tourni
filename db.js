const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_db_user',       // Replace with your PostgreSQL username
  host: 'localhost',          // Replace with your database host
  database: 'your_db_name',   // Replace with your database name
  password: 'your_db_password', // Replace with your database password
  port: 5432,                 // Default PostgreSQL port
});

module.exports = pool;