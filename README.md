# Shop Monitoring

Shopmon is a hosted application from FriendsOfShopware to manage multiple Shopware instances.

## Features

Overview of all your Shopware instances to see:

- Shopware Version and Security Updates
- Show all installed extension and extension updates

## Requirements

- Cloudflare Worker
- Planet Scale Database
- Mailgun

## Install

### Frontend

- Go to `frontend`
- Run  `npm i` and `npm run dev`
- Open `localhost:3000` to see the page

### Hosting own API

- Install [wrangler](https://developers.cloudflare.com/workers/wrangler/get-started/)
- Create an own [Planet Scale Account](https://auth.planetscale.com/sign-up) + Database
- Create an own [Mailgun Account](https://signup.mailgun.com/new/signup) or copy verify code from Database entries
- Create [a serverless access key](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript)
- Activate [Google Pagespeed API](https://developers.google.com/speed/docs/insights/v5/get-started)
- Import schema `db.sql` using some MySQL CLI's
- Go to `api`
- Create a file `.dev.vars`

```text
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_USER=USER
DATABASE_PASSWORD=PW
MAILGUN_KEY=PRIVATE_KEY
MAILGUN_DOMAIN=sandboxXXXXXXXXXXXXXXXXXXXXXXXX.mailgun.org
SENTRY_DSN=https://sentry.io
PAGESPEED_API_KEY=AIzaSyCWNar-IbOaQT1WX_zfAjUxG01x7xErbSc
APP_SECRET=MZRa9lEjACNhNhw40QXwRZANRx8f1WQa
```
- Emails will be not really send, copy the code from the API
- Run `npm install`
- Run `npm run dev:local`


## License

MIT
