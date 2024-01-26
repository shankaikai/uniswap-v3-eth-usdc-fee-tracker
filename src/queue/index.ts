import { TransactionEvent } from "@prisma/client";
import { NatsConnection, StringCodec } from "nats";
import { insertTransactionEvents } from "../db/utils";
import { QUEUE_SUBJECT_NAME } from "../lib/constants";
import { logger } from "../lib/logger";
import { EtherscanTokenTransferEventsByAddressResponse } from "../lib/types";
import { calculateTransactionFee } from "../lib/utils";

export async function startSubscriber(nc: NatsConnection) {
  logger.info("Starting subscriber...");
  const sc = StringCodec();
  const sub = nc.subscribe(QUEUE_SUBJECT_NAME);

  (async () => {
    for await (const m of sub) {
      logger.info("Received data for processing");
      let processedData: TransactionEvent[] = [];
      const data = JSON.parse(
        sc.decode(m.data)
      ) as EtherscanTokenTransferEventsByAddressResponse["result"];

      for (const event of data) {
        const { blockNumber, timeStamp, hash, gasPrice, gasUsed } = event;
        const { transactionFeeInUSDT, transactionFeeInETH } =
          await calculateTransactionFee(gasPrice, gasUsed, timeStamp);
        processedData.push({
          blockNumber,
          timeStamp: parseInt(timeStamp),
          hash,
          gasPrice,
          gasUsed,
          transactionFeeInETH,
          transactionFeeInUSDT,
        });
      }

      logger.info(`Inserting ${data.length} transaction events`);
      await insertTransactionEvents(processedData);
    }
  })();
}
