// const puppeteer = require("puppeteer");
// const fs = require("fs");

// console.log("Hello, World!");

// const run = async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(
//     "https://archive.roar.media/sinhala/main/health-lifestyle/premaya-new-perspectives-on-love-and-sanity"
//   );

//   //const ss = await page.screenshot({ path: "senconnect.png", fullPage: true });
//   //   const senconnectPdf = await page.pdf({
//   //     path: "senconnect.pdf",
//   //     format: "A4",
//   //   });

//   //   const pageHTML = await page.content();
//   //   fs.writeFileSync("page.html", pageHTML);

//   const pageText = await page.evaluate(() => {
//     const content = document.querySelector(".entry-content");
//     return content ? content.innerText : "No content found";
//   });

//   console.log(pageText);

//   fs.writeFileSync("page.txt", pageText);

//   await browser.close();
// };

// run();

const puppeteer = require("puppeteer");
const fs = require("fs");

const scraper = async (urls) => {
  const browser = await puppeteer.launch();
  for (let url of urls) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page
      .waitForSelector(".story-content-format.no-print pre", { visible: true })
      .catch((e) => console.log("Selector not found"));

    const htmlContent = await page.evaluate(() => document.body.innerHTML);
    console.log(htmlContent); // Debug output to see what the HTML structure looks like

    const pageText = await page.evaluate(() => {
      const content = document.querySelector(
        ".story-content-format.no-print pre"
      );
      return content ? content.innerText : "No content found";
    });

    console.log("Extracted text:", pageText); // Debug output to check extracted text

    fs.appendFileSync("page.txt", pageText + "\n\n");

    await page.close();
  }
  await browser.close();
};

module.exports = { scraper };
