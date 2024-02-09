const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "gattasahab",
    host: "localhost",
    port: 5432,
    database: "trustyhires"
});

module.exports = pool;