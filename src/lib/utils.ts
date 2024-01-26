import axios from "axios";
import { config } from "../config";
import {
  BATCH_SIZE,
  QUEUE_SUBJECT_NAME,
  UNISWAP_V3_ADDRESS,
} from "./constants";
import { alchemyProvider } from "./providers";
import {
  BinanceKlineResponse,
  EtherscanTokenTransferEventsByAddressResponse,
} from "./types";
import { logger } from "./logger";
import { NatsConnection, StringCodec } from "nats";
import { ethers } from "ethers";
import { db } from "../db";

/*
 * Get the latest ETH block number
 */
export async function getLastestBlockNumber() {
  return await alchemyProvider.getBlockNumber();
}

/*
 * Get the latest block in DB to start historical batch job from so that we don't have to re-fetch blocks that are already in the DB
 */
export async function getStartBlock() {
  const latest = await db.transactionEvent.findMany({
    orderBy: {
      blockNumber: "desc",
    },
    take: 1,
  });

  if (!latest.length) return "0";

  return latest[0].blockNumber;
}

/*
 * Get the closest ETH/USDT price at a given timestamp
 */
export async function getETHUSDTPrice(timestamp: string | number) {
  let params: {
    symbol: string;
    interval: string;
    startTime?: string | number;
    limit: number;
  } = {
    symbol: "ETHUSDT",
    interval: "1h",
    startTime: timestamp,
    limit: 1,
  };

  if (timestamp === "latest") {
    params.startTime = undefined;
    params.interval = "1m";
  }

  const response = await axios.get<BinanceKlineResponse>(
    "https://api.binance.com/api/v3/klines",
    {
      params,
    }
  );

  // The other fields besides closePrice are not needed
  const [, , , , closePrice, , , , , , , _] = response.data[0];

  return parseFloat(closePrice);
}

/*
 * Get a batch of historical token transfer events from Uniswap V3 at a given startblock and endblock
 */
export async function getTokenTransferEventsFromEtherscan(
  batchSize: number,
  startblock: string | number,
  endblock: string | number
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

/*
 * This function will fetch all records from a given start block to the latest block and publish them to the NATS queue. An optional callback can be provided upon completion to update starting block number for live polling.
 */
export async function startBatchProcessingJob(
  latestBlockNumber: number | string,
  nc: NatsConnection,
  startBlock?: number | string,
  callback?: (blockNumber: string) => void
) {
  logger.info("Starting to fetch historical token transfer events");

  let continueFetching = true;
  let lastPublishedBlockNumber = "";
  const sc = StringCodec();

  while (continueFetching) {
    const batch = await getTokenTransferEventsFromEtherscan(
      BATCH_SIZE,
      startBlock ?? 0,
      latestBlockNumber
    );

    // Break if no more events to fetch
    if (!batch.length) {
      continueFetching = false;
      break;
    }

    logger.info(`Publishing batch of ${batch.length} events`);
    nc.publish(QUEUE_SUBJECT_NAME, sc.encode(JSON.stringify(batch)));

    // Update last published block number (used in live polling)
    lastPublishedBlockNumber = batch[batch.length - 1].blockNumber;

    if (batch.length === BATCH_SIZE) {
      startBlock = parseInt(batch[batch.length - 1].blockNumber);
    } else {
      continueFetching = false;
    }
  }

  logger.info("Finished fetching historical token transfer events");
  callback?.(lastPublishedBlockNumber);
}

/*
 * Calculate transaction fee in USDT at a given timestamp
 */
export async function calculateTransactionFee(
  gasPrice: string,
  gasUsed: string,
  timeStamp: string
) {
  const bigIntGasPrice = ethers.toBigInt(gasPrice);
  const bigIntGasUsed = ethers.toBigInt(gasUsed);
  const transactionFeeInETH = parseFloat(
    ethers.formatEther(bigIntGasPrice * bigIntGasUsed)
  );
  const transactionFeeInUSDT =
    transactionFeeInETH * (await getETHUSDTPrice(timeStamp));
  return { transactionFeeInETH, transactionFeeInUSDT };
}
