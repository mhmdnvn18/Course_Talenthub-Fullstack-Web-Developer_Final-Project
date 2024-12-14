//ini merupakan file configurasi

const express = require("express");
const pool = require("./connection");
const cors = require("cors");

const app = express();

const port = 3000;

// nambahin cors/ permission
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello World! Anda berhasil");
});

app.get("/Warung", async (request, response) => {
  try {
    const data = await pool.query(`SELECT * FROM Warung`);

    let dataWarung = data.rows;

    response.json(dataWarung);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/Warung/:id", async (request, response) => {
  try {
    const data = await pool.query(
      `SELECT * FROM Warung WHERE id = ${request.params.id}`
    );

    let dataWarung = data.rows[0];

    // if (dataMovies === undefined || dataMovies === null) {}
    if (!dataWarung) {
      response.status(404).json({ message: "Data Not Found" });
    } else {
      response.json(dataWarung);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
