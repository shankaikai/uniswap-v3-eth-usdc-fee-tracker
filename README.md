# Uniswap V3 ETHUSDT Transaction Fee Tracker

## Setup

First, add the required API keys to `.env`.

`PORT` - Defines the port that the server will run on
`ETHERSCAN_API_KEY` - API Key Token to access Etherscan API (Obtained from https://etherscan.io/myapikey)
`ALCHEMY_API_KEY` - API Key Token to access Alchemy (Obtained from https://dashboard.alchemy.com/)

Then, run the next script to install all dependencies and create the builds:

```
npm run setup
```

Lastly, run all the services

```
docker-compose up
```

Urls:
`/` - React SPA
`/api` - Main endpoint to query for token transfer events
`/docs` - Swagger docs

## Project structure

The `root` contains the code for the Express.js backend.
The `prisma` folder contains the schema for [Prisma](https://www.prisma.io/) ORM.

The `client` folder contains the code for the React + Vite frontend. The template was generated using `npx create-vite@latest` and the UI was build using [shadcn/ui](https://ui.shadcn.com/) with Tailwind.css.

## Architecture

## References

Referred to [this guide](https://medium.com/@it.ermias.asmare/setting-up-expressjs-and-typescript-cfbee581c678) to setup the inital Express.js boilerplate.

For the style guide, I tried to follow [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as closely as possible.

For batch processing of token transfer events and adding them into the DB, I used [Nats Queue](https://github.com/nats-io/nats.js).

To add docs I used [Swagger JS Docs](https://www.npmjs.com/package/swagger-jsdoc).

To ensure pagination scales, I used [cursor-based pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination) instead of offset-based pagination. This would significantly improve performance.
