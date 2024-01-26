/*
Example response from Binance Kline API:
  [
    1499040000000,      // Kline open time
    "0.01634790",       // Open price
    "0.80000000",       // High price
    "0.01575800",       // Low price
    "0.01577100",       // Close price
    "148976.11427815",  // Volume
    1499644799999,      // Kline Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "0"                 // Unused field, ignore.
  ]
*/
export type BinanceKlineResponse = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
  string
][];

/*
Example response from Etherscan "Get a list of 'ERC20 - Token Transfer Events' by Address" API
  {
   "status":"1",
   "message":"OK",
   "result":[
      {
         "blockNumber":"4730207",
         "timeStamp":"1513240363",
         "hash":"0xe8c208398bd5ae8e4c237658580db56a2a94dfa0ca382c99b776fa6e7d31d5b4",
         "nonce":"406",
         "blockHash":"0x022c5e6a3d2487a8ccf8946a2ffb74938bf8e5c8a3f6d91b41c56378a96b5c37",
         "from":"0x642ae78fafbb8032da552d619ad43f1d81e4dd7c",
         "contractAddress":"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
         "to":"0x4e83362442b8d1bec281594cea3050c8eb01311c",
         "value":"5901522149285533025181",
         "tokenName":"Maker",
         "tokenSymbol":"MKR",
         "tokenDecimal":"18",
         "transactionIndex":"81",
         "gas":"940000",
         "gasPrice":"32010000000",
         "gasUsed":"77759",
         "cumulativeGasUsed":"2523379",
         "input":"deprecated",
         "confirmations":"7968350"
      },
      {
         "blockNumber":"4764973",
         "timeStamp":"1513764636",
         "hash":"0x9c82e89b7f6a4405d11c361adb6d808d27bcd9db3b04b3fb3bc05d182bbc5d6f",
         "nonce":"428",
         "blockHash":"0x87a4d04a6d8fce7a149e9dc528b88dc0c781a87456910c42984bdc15930a2cac",
         "from":"0x4e83362442b8d1bec281594cea3050c8eb01311c",
         "contractAddress":"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
         "to":"0x69076e44a9c70a67d5b79d95795aba299083c275",
         "value":"132520488141080",
         "tokenName":"Maker",
         "tokenSymbol":"MKR",
         "tokenDecimal":"18",
         "transactionIndex":"167",
         "gas":"940000",
         "gasPrice":"35828000000",
         "gasUsed":"127593",
         "cumulativeGasUsed":"6315818",
         "input":"deprecated",
         "confirmations":"7933584"
      }
   ]
  }
*/
export type EtherscanTokenTransferEventsByAddressResponse = {
  status: "0" | "1";
  message: string;
  result: {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    from: string;
    contractAddress: string;
    to: string;
    value: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDecimal: string;
    transactionIndex: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    cumulativeGasUsed: string;
    input: string;
    confirmations: string;
  }[];
};

export type QueryParams = {
  txHash: string;
  startTime: string;
  endTime: string;
};
