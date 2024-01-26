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
import { startPollingForTokenEvents } from "./crons";
import { startSubscriber } from "./queue";

async function main() {
  logger.info("Bootstrapping server...");

  logger.info("Starting nats queue...");
  const nc = await connect({ servers: `nats://0.0.0.0:${config.natsPort}` });
  logger.info(`Connected to nats server at ${config.natsPort}`);

  const latestBlockNumber = await getLastestBlockNumber();
  logger.info(`Latest block number: ${latestBlockNumber}`);

  const startBlock = await getStartBlock();

  logger.info("Starting batch processing job");
  startBatchProcessingJob(latestBlockNumber, nc, startBlock);

  startSubscriber(nc);

  startPollingForTokenEvents(nc, startBlock);

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", async (req, res) => {
    res.send("Hello world");
  });

  app.listen(config.port, () => {
    console.log(
      `[server]: Server is running at http://localhost:${config.port}`
    );
  });
}

main();
