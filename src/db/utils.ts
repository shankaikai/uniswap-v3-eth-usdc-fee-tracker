import { TransactionEvent } from "@prisma/client";
import { db } from ".";

export async function insertTransactionEvents(data: TransactionEvent[]) {
  await db.transactionEvent.createMany({ data, skipDuplicates: true });
}

/**
 * Get transaction events from the DB with pagination and filtering
 */
export async function getTransactionEvents(
  cursor: string,
  pageSize: number,
  hash?: string,
  startTimeStamp?: number,
  endTimeStamp?: number
) {
  return await db.transactionEvent.findMany({
    orderBy: {
      timeStamp: "desc",
    },
    where: {
      hash,
      timeStamp: {
        gte: startTimeStamp,
        lte: endTimeStamp,
      },
    },
    cursor: {
      hash: cursor,
    },
    skip: 1, // skip the cursor
    take: pageSize,
  });
}
