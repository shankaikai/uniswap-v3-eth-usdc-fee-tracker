import axios from "axios";
import { config } from "../config";
import { UNISWAP_V3_ADDRESS } from "./constants";
import { alchemyProvider } from "./providers";
import {
  BinanceKlineResponse,
  EtherscanTokenTransferEventsByAddressResponse,
} from "./types";
import { logger } from "./logger";

/*
 * Get the latest ETH block number
 */
export async function getLastestBlockNumber() {
  return await alchemyProvider.getBlockNumber();
}

/*
 * Get the closest ETH/USDT price at a given timestamp
 */
export async function getETHUSDTPrice(timestamp: number) {
  const response = await axios.get<BinanceKlineResponse>(
    "https://api.binance.com/api/v3/klines",
    {
      params: {
        symbol: "ETHUSDT",
        interval: "1h",
        startTime: timestamp,
        limit: 1,
      },
    }
  );

  // The other fields besides closePrice are not needed
  const [, , , , closePrice, , , , , , , _] = response.data[0];

  return closePrice;
}

/*
 * Get a batch of historical token transfer events from Uniswap V3 at a given startblock and endblock
 */
export async function getTokenTransferEventsFromEtherscan(
  batchSize = 5000,
  startblock: number,
  endblock: number
) {
  const response =
    await axios.get<EtherscanTokenTransferEventsByAddressResponse>(
      "https://api.etherscan.io/api",
      {
        params: {
          module: "account",
          action: "tokentx",
          address: UNISWAP_V3_ADDRESS,
          startblock,
          endblock,
          page: 1,
          offset: batchSize,
          sort: "asc",
          apikey: config.etherScanApiKey,
        },
      }
    );
  return response.data.result;
}

export async function startHistoricalBatchJob(
  latestBlockNumber: number,
  startBlock = 0
) {
  const batchSize = 5000;
  let continueFetching = true;

  while (continueFetching) {
    const batch = await getTokenTransferEventsFromEtherscan(
      batchSize,
      startBlock,
      latestBlockNumber
    );
    logger.info(`Adding batch of ${batch.length} token transfer events to db`);
    // TODO: Add batch to queue for processing and adding to DB
    if (batch.length === batchSize) {
      startBlock = parseInt(batch[batch.length - 1].blockNumber);
    } else {
      continueFetching = false;
    }
  }
  logger.info("Finished fetching historical token transfer events");
}
