import { Request, Response } from "express";
import { getTransactionEvents } from "../db/utils";

export async function queryController(req: Request, res: Response) {
  const { txHash, startTime, endTime } = req.query;
  if (!txHash) {
    res.status(400).json({ msg: "txHash is required" });
  } else {
    const items = await getTransactionEvents(
      txHash as string,
      startTime as string,
      endTime as string
    );
    console.log("Here");
    res.status(200).json({ items });
  }
}
