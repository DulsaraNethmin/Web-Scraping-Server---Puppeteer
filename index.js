const express = require("express");
const { scraper } = require("./blogScraper");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/getContent", async (req, res) => {
  const urls = req.body.urls;

  if (!urls) {
    return res.status(400).send("Please provide URLs");
  }

  await scraper(urls);

  // Assuming 'page.txt' is in the current directory of your server
  const filePath = "page.txt";

  // Ensure the file exists before trying to send it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    // Use res.sendFile to send the file
    res.sendFile(filePath, { root: __dirname });
  });
});

app.listen(4001, () => {
  console.log("Server running on port 4001");
});
