import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "ETH/USDC Uniswap V3 Transaction Fee Tracker",
    version: "1.0.0",
  },
  components: {
    schemas: {
      TransactionEvent: {
        type: "object",
        properties: {
          hash: {
            type: "string",
            description: "The transaction hash of the event",
            example:
              "0xfa9cdc283025103255d322c5d0b3a15329f605a18db4dc81a6f42f84e804d1e9",
          },
          blockNumber: {
            type: "string",
            description: "The block number of the event",
            example: "12383963",
          },
          timeStamp: {
            type: "string",
            description: "The timestamp of the event",
            example: "1620347202",
          },
          gasPrice: {
            type: "string",
            description: "The gas price in wei",
            example: "59400001604",
          },
          gasUsed: {
            type: "string",
            description: "The number of units of gas used",
            exameple: "132897",
          },
          transactionFeeInETH: {
            type: "number",
            format: "float",
            description: "The transaction fee in ETH",
            example: 0.007894082013166787,
          },
          transactionFeeInUSDT: {
            type: "number",
            format: "float",
            description: "The transaction fee in USDT at the time of the event",
            example: 2.380934075991235,
          },
        },
        required: ["id", "hash", "timestamp", "data"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
