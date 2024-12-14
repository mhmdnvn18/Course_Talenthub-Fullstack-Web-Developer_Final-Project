const { Pool } = require("pg");

const pool = new Pool({
  host: "db.fjpiubbgribqdjfvjujk.supabase.co", 
  user: "postgres",
  database: "postgres",
  password: "#1A14n15o16p",
  port: "5432",
  max: 20,
  idleTimeoutMillis: 2000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;

//console.log(pool);