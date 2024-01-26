export type ApiParamsType = {
  txHash?: string;
  startTime?: string;
  endTime?: string;
  pageSize?: string;
  pageIndex?: number;
};

export type ApiResponseType = {
  items: {
    hash: string;
    blockNumber: string;
    timeStamp: string;
    gasPrice: string;
    gasUsed: string;
    transactionFeeInETH: number;
    transactionFeeInUSDT: number;
  }[];
};

export type SummaryResponseType = {
  currentETHUSDTPrice: number;
  totalTransactionFeeInETH: number;
  totalTransactionFeeInUSDT: number;
};
