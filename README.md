# Tokka Labs Challenge

## Setup

```
cp .env.example .env
npm i
```

`PORT` - Defines the port that the server will run on
`ETHERSCAN_API_KEY` - API Key Token to access Etherscan API (Obtained from https://etherscan.io/myapikey)

To run in development mode:

```
npm run dev
```

To build and run:

```
npm run build
npm run start
```

To call the API:

```
curl localhost:3001/api
```

Swagger docs url:

```
localhost:3001/docs
```

## References

Referred to [this guide](https://medium.com/@it.ermias.asmare/setting-up-expressjs-and-typescript-cfbee581c678) to setup the inital Express.js boilerplate.

For the style guide, I tried to follow [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as closely as possible.

For batch processing of token transfer events and adding them into the DB, I used [Nats Queue](https://github.com/nats-io/nats.js).

To add docs I used [Swagger JS Docs](https://www.npmjs.com/package/swagger-jsdoc).

To ensure pagination scales, I used [cursor-based pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination) instead of offset-based pagination. This would significantly improve performance.
