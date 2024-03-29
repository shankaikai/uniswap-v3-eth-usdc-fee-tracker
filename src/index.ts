import cors from "cors";
import express from "express";
import { config } from "./config";
import { logger } from "./lib/logger";
import {
  getLastestBlockNumber,
  getStartBlock,
  startBatchProcessingJob,
} from "./lib/utils";

import { connect } from "nats";
import swaggerUi from "swagger-ui-express";
import { startPollingForTokenEvents } from "./crons";
import { swaggerSpec } from "./docs";
import { startSubscriber } from "./queue";
import { router } from "./routes";
import path from "path";

async function main() {
  logger.info("Bootstrapping server...");

  logger.info("Starting nats queue...");
  const nc = await connect({ servers: `${config.natsUrl}:${config.natsPort}` });
  logger.info(`Connected to nats server at ${config.natsPort}`);

  const latestBlockNumber = await getLastestBlockNumber();
  logger.info(`Latest block number: ${latestBlockNumber}`);

  const startBlock = await getStartBlock();

  logger.info("Starting batch processing job");
  startBatchProcessingJob(latestBlockNumber, nc, startBlock);

  logger.info("Starting queue subscriber");
  startSubscriber(nc);

  logger.info("Starting cron job to poll for new token events");
  startPollingForTokenEvents(nc, startBlock);

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", router);

  app.listen(config.port, () => {
    console.log(
      `[server]: Server is running at http://localhost:${config.port}`
    );
  });
}

main();
