import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
const fetch = require('node-fetch')

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

async function seoFetch(url) {
  let settingsRes = await fetch('https://api.verkaufes24.de/seo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: url})
  });

  return await settingsRes.json();
}



const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};

    let metaTags = await seoFetch(req.url.split('?')[0]);
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App metaTags={metaTags} />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta name="color-scheme" content="only">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Auto Bär</title>
        <meta name="description" content="${metaTags.description && metaTags.description}" />
        <meta property="og:url"                content="${metaTags['og:url'] && metaTags['og:url']}" />
      <meta property="og:type"               content="${metaTags['og:type'] && metaTags['og:type']}" />
      <meta property="og:title"              content="${metaTags['og:title'] && metaTags['og:title']}" />
      <meta property="og:description"        content="${metaTags['og:description'] && metaTags['og:description']}" />
      <meta property="og:image"              content="${metaTags['og:image'] && metaTags['og:image']}" />
       
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        }
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
