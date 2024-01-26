import { Request, Response } from "express";
import { getETHUSDTPrice } from "../lib/utils";
import {
  getTotalTransactionFeeInETH,
  getTotalTransactionFeeInUSDT,
} from "../db/utils";

export async function summaryController(_: Request, res: Response) {
  const currentETHUSDTPrice = await getETHUSDTPrice("latest");
  const totalTransactionFeeInUSDT = await getTotalTransactionFeeInUSDT();
  const totalTransactionFeeInETH = await getTotalTransactionFeeInETH();
  res.status(200).json({
    currentETHUSDTPrice,
    totalTransactionFeeInETH,
    totalTransactionFeeInUSDT,
  });
}
