import { Request, Response } from "express";
import { getTransactionEvents } from "../db/utils";

export async function queryController(req: Request, res: Response) {
  const { txHash, startTime, endTime, pageIndex, pageSize } = req.query;
  const items = await getTransactionEvents(
    pageIndex ? parseInt(pageIndex as string) : undefined,
    pageSize ? parseInt(pageSize as string) : undefined,
    txHash as string,
    startTime ? parseInt(startTime as string) : undefined,
    endTime ? parseInt(endTime as string) : undefined
  );
  res.status(200).json({ items });
}
