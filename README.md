# Uniswap V3 ETHUSDT Transaction Fee Tracker

## Setup

First, run the following command add the required API keys to `.env`.

```
cp .env.example .env
```

`PORT` - Defines the port that the Express server will run on
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

### URLs

`/` - React SPA

`/api` - Endpoint to query for token transfer events

`/summary` - Endpoint to query for summary statistics

`/docs` - Swagger docs

## Test

The test cases are written using the Jest framework.

```
npm run test
```

## Project structure

The `root` contains the code for the Express.js backend.
The `prisma` folder contains the schema for [Prisma](https://www.prisma.io/) ORM.

The `client` folder contains the code for the React + Vite frontend. The template was generated using `npx create-vite@latest` and the UI was build using [shadcn/ui](https://ui.shadcn.com/) with Tailwind.css.

## Architecture

The Express.js server is the main entrypoint of the application, and also serves the React static site. When the server is started, it runs 2 functions. One to start downloading the historical token transfer data in batches of 100 (number chosen via trial and error) and another to poll for new token transactions every minute. Once new events are found, they are pushed to a nats queue for processing. The transaction fee is calculated by finding the ETHUSDT price with the closest timestamp ahead of the token transfer event timestamp. Once the batch of 100 events are processed, they are saved in the MySQL DB via the Prisma ORM.

## Limitations / Struggles

- Due to the limited API params from Etherscan, I could only query for events using start and end block which would result in a lot of duplicate data being queried from the endpoint. The duplicates won't be added to the DB but reduces the efficiency of the historical data download process.
- Being unfamiliar with nats queue, I wasn't sure if the way I implemented it was ideal and was not sure how to use more than 1 subscriber to speed up processing.
- When using `docker-compose up`, I ran into issues where the server tried to migrate the DB schema but the MySQL container was not ready yet, thus causing the server to error. I solved this using the [wait script from ufoscout](https://github.com/ufoscout/docker-compose-wait).

## References

Referred to [this guide](https://medium.com/@it.ermias.asmare/setting-up-expressjs-and-typescript-cfbee581c678) to setup the inital Express.js boilerplate.

For the style guide, I tried to follow [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as closely as possible.

For batch processing of token transfer events and adding them into the DB, I used [Nats Queue](https://github.com/nats-io/nats.js).

To add docs I used [Swagger JS Docs](https://www.npmjs.com/package/swagger-jsdoc).
