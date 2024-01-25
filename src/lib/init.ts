import { getLastestBlockNumber } from "./utils";

export async function initalise() {
  const latestBlockNumber = await getLastestBlockNumber();
  // TODO: Start the batch job to record historical token transfer events
  // TODO: Start the cron job to poll for new token transfer events
}
