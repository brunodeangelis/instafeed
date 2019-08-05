# 📸 Instafeed

Instafeed is a simple example on how to use Puppeteer to scrape several webpages and retrieve information from them with (or without) Cheerio. This information is served on a dynamic endpoint (/:username).

Technologies used:

- Vue.js, Axios, TailwindCSS
- Express, Puppeteer, Cheerio

Modify API URL inside client's .env file.

## 🚀 Deploy

Server (from branch "heroku-server")
[![Deploy server to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/brunodeangelis/heroku-server)

Client
[![Deploy client to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brunodeangelis/instafeed)

## 📦 Buildpacks

Server uses the following Heroku buildpacks:
jontweks/puppeteer: For ensuring Puppeteer dependencies are installed on the server
heroku/nodejs: For building and running our Express app

## 💻 Commands

Client
development

```
npm run serve
```

production

```
npm run build
```

Server
development

```
npm run dev
```

production

```
npm run start
```

## 📝 Notes

Scraping websites depends on their structure. If Instagram decides to modify their endpoints/HTML structure then this example won't be functional anymore. However, it's still useful for learning purposes.
