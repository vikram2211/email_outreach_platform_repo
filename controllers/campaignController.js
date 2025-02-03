const Campaign = require("../models/Campaign");
const importedUser = require("../models/importedUser");
const csv = require("csv-parser");
const fs = require("fs");

exports.createCampaign = async (req, res) => {
  try {
    const { name, csvData, template } = req.body;
    const campaign = new Campaign({
      userId: req.user.id,
      name,
      csvData,
      template,
    });
    await campaign.save();
    res.status(201).json({ message: "Campaign created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error creating campaign" });
  }
};

// exports.uploadCSV = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// };

exports.uploadCSV = async (req, res) => {
//   console.log("inside");
//   console.log(req.file, "file");
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  const csvToSchemaMap = {
    "First Name": "firstName",
    "Last Name": "lastName",
    Company: "company",
    // City: "city",
    // Country: "country",
    "Phone 1": "number",
    // "Phone 2": "phone2",
    Email: "email",
    // "Subscription Date": "subscriptionDate",
    // Website: "website",
  };
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
    //   console.log("row", row);
      let transformedRow = {};
      for (let key in row) {
        const newKey = csvToSchemaMap[key] || key; // Use mapped key or keep original
        transformedRow[newKey] = row[key];
      }

      results.push(transformedRow);
    })
    .on("end", async () => {
      try {
        await importedUser.insertMany(results);

        fs.unlinkSync(filePath);

        res.status(200).json({ message: "CSV uploaded and data saved" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ error: "Database error" });
      }
    });
};
