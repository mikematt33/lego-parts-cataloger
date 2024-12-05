const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const csvFilePath = path.join(__dirname, "parts.csv");
const outputFilePath = path.join(__dirname, "src/data.js");

const disableFilter = process.argv.includes("--no-filter");

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}

function filterCSV(rows) {
  if (disableFilter) {
    return rows;
  }

  return rows.filter(
    (row) =>
      !row["name"].includes("Sticker") &&
      !row["name"].includes("Duplo") &&
      !row["name"].includes("Quatro") &&
      !row["name"].includes("Primo") &&
      !row["part_num"].includes("pr")
  );
}

function writeJSFile(filePath, data) {
  const jsContent = `const data = ${JSON.stringify(
    data,
    null,
    2
  )};\nexport default data;`;
  fs.writeFileSync(filePath, jsContent);
}

async function generateJSFromCSV() {
  try {
    const csvData = await readCSV(csvFilePath);

    const filteredData = filterCSV(csvData);

    writeJSFile(outputFilePath, filteredData);
    console.log("JavaScript file successfully generated.");
  } catch (error) {
    console.error("Error:", error);
  }
}

generateJSFromCSV();
