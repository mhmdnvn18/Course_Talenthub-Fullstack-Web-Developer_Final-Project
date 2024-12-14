//seeding berfungsi untuk inisiasi aawal memasukan data ke database

const pool = require("./connection");
const data = require("./Warung.json");

let newData = data.map((el) => {
  return `('${el.foodName}', ${el.price}, '${el.imageUrl}')`;
});

let newDataToInsert = newData.join(",");

let seedDataQuery = `
  INSERT INTO Warung ("foodName", "price", "imageUrl")
  VALUES ${newDataToInsert}
`;

async function runSeed() {
  try {
    await pool.query(seedDataQuery);
    console.log("Success seed table Warung");
  } catch (error) {
    console.log(error);
  }
}

runSeed();
