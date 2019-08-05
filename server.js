const puppeteer = require("puppeteer");
const $ = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

const getUserImages = async user => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"], headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.instagram.com/${user}`);
  await page.waitForSelector("img", {
    visible: true,
  });

  let html = await page.content();
  let detailUrls = [];
  let imgsUrls = [];
  let photos = [];

  // Busco todos los links a cada imagen
  $("a[href^='/p']", html).each((i, el) => detailUrls.push($(el).attr("href")));

  // Busco el atributo src de cada imagen
  $("img[style='object-fit: cover;']", html).each((i, el) => {
    imgsUrls.push($(el).attr("src"));
  });

  // Itero sobre los links para ir a cada página y agarrar descripciones
  for (let i = 0; i < detailUrls.length; i++) {
    const detailUrl = detailUrls[i];
    const imgUrl = imgsUrls[i];

    await page.goto(`https://www.instagram.com${detailUrl}`);
    await page.waitForSelector("img");
    const detailHTML = await page.content();

    const description = $("h2", detailHTML)
      .siblings("span")
      .text();

    photos.push({
      imgUrl,
      description,
      path: `https://www.instagram.com${detailUrl}`,
    });
  }

  await browser.close();

  return photos;
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Use /:user endpoint to get user pictures.");
});

app.get("/:user", async (req, res) => {
  const imgs = await getUserImages(req.params.user);
  res.send(imgs);
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
