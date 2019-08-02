# 📸 Instafeed
Instafeed is a simple example on how to use Puppeteer to scrape several webpages and retrieve information from them with (or without) Cheerio. This information is served on a dynamic endpoint (/:username).

Technologies used:
- Vue.js, Axios, TailwindCSS
- Express, Puppeteer, Cheerio

Modify API URL inside client's .env file.

## 💻 Commands

Client
```
npm run serve
```

Server
```
npm start
```

## 📝 Notes
Scraping websites depends on their structure. If Instagram decides to modify their endpoints/HTML structure then this example won't be functional anymore. However, it's still useful for learning purposes.
