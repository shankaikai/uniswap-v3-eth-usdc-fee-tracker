import { TransactionEvent } from "@prisma/client";
import { db } from ".";

export async function insertTransactionEvents(data: TransactionEvent[]) {
  await db.transactionEvent.createMany({ data, skipDuplicates: true });
}

export async function getTransactionEvents(
  hash: string,
  startTimeStamp?: string,
  endTimeStamp?: string
) {
  return await db.transactionEvent.findMany({
    where: {
      hash,
      timeStamp: {
        gte: startTimeStamp,
        lte: endTimeStamp,
      },
    },
  });
}
