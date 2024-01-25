# Tokka Labs Challenge

## Setup

```
cp .env.example .env
```

`PORT` - Defines the port that the server will run on
`ETHERSCAN_API_KEY` - API Key Token to access Etherscan API (Obtained from https://etherscan.io/myapikey)

To run in development mode:

```
npm i
npm run dev
```

To build and run:

```
npm run build
npm run start
```

## References

Referred to [this guide](https://medium.com/@it.ermias.asmare/setting-up-expressjs-and-typescript-cfbee581c678) to setup the inital Express.js boilerplate.

For the style guide, I tried to follow [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as closely as possible.

[Error handling best practices](https://stackify.com/node-js-error-handling/)

[Simple unit testing for express](https://medium.com/@abel.osorio/simple-unit-testing-for-express-routes-using-dependency-injection-e0c0750a5527)
