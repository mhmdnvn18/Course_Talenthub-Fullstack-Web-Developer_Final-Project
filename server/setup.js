// file ini untuk melakukan setup table ke dalam database
const pool = require("./connection");

let createTableWarung = `
  CREATE TABLE Warung (
  "id" SERIAL PRIMARY KEY, 
  "foodName" VARCHAR(50),
  "price" NUMERIC(10, 3),
  "imageUrl" TEXT
);
`;

// koneksi ke database => asynchronous

async function runSetup() {
  try {
    await pool.query(createTableWarung);
    console.log("Success setup table Warung");
  } catch (error) {
    console.log(error);
  }
}

runSetup();
