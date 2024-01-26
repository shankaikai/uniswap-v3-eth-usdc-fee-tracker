import { CronJob } from "cron";
import { NatsConnection } from "nats";
import { startBatchProcessingJob } from "../lib/utils";
import { logger } from "../lib/logger";

/*
 * Cron job that polls for new token transfer events every minute
 */
export function startPollingForTokenEvents(
  nc: NatsConnection,
  startBlock: string
) {
  logger.info("Starting to poll for new token transfer events");
  let currentStartBlock = startBlock;
  new CronJob(
    "* * * * *", // cronTime
    () => {
      startBatchProcessingJob(
        "latest",
        nc,
        currentStartBlock,
        (val) => (currentStartBlock = val)
      );
    }, // onTick
    null, // onComplete
    true // start
  );
}
