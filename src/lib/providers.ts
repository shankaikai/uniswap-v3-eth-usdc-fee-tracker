import { ethers } from "ethers";
import { config } from "../config";

export const alchemyProvider = new ethers.AlchemyProvider(
  "homestead", // mainnet
  config.alchemyApiKey
);
