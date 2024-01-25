import { TransactionEvent } from "@prisma/client";
import { db } from ".";

export async function insertTransactionEvents(data: TransactionEvent[]) {
  await db.transactionEvent.createMany({ data });
}
