import { TransactionEvent } from "@prisma/client";
import { db } from ".";

export async function insertTransactionEvents(data: TransactionEvent[]) {
  await db.transactionEvent.createMany({ data, skipDuplicates: true });
}

/**
 * Get transaction events from the DB with pagination and filtering
 */
export async function getTransactionEvents(
  pageIndex = 0,
  pageSize = 50,
  hash?: string,
  startTimeStamp?: number,
  endTimeStamp?: number
) {
  return await db.transactionEvent.findMany({
    orderBy: {
      timeStamp: "desc",
    },
    where: {
      hash: hash,
      timeStamp: {
        gte: startTimeStamp,
        lte: endTimeStamp,
      },
    },
    skip: pageIndex ? pageIndex * pageSize : 0,
    take: pageSize,
  });
}

export async function getTotalTransactionFeeInUSDT() {
  return (
    await db.transactionEvent.aggregate({
      _sum: {
        transactionFeeInUSDT: true,
      },
    })
  )._sum.transactionFeeInUSDT;
}

export async function getTotalTransactionFeeInETH() {
  return (
    await db.transactionEvent.aggregate({
      _sum: {
        transactionFeeInETH: true,
      },
    })
  )._sum.transactionFeeInETH;
}
