import { logger } from "./logger";
import { getLastestBlockNumber, startHistoricalBatchJob } from "./utils";

export async function initalise() {
  const latestBlockNumber = await getLastestBlockNumber();
  logger.info(`Latest block number: ${latestBlockNumber}`);
  // TODO: Start the batch job to record historical token transfer events
  startHistoricalBatchJob(latestBlockNumber);
  // TODO: Start the cron job to poll for new token transfer events
}
