import dotenv from "dotenv";

dotenv.config();

function generateConfig() {
  if (!process.env.ETHERSCAN_API_KEY)
    throw new Error("ETHERSCAN_API_KEY is undefined");
  if (!process.env.ALCHEMY_API_KEY)
    throw new Error("ALCHEMY_API_KEY is undefined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL is undefined");

  return {
    port: process.env.PORT || 3001,
    etherScanApiKey: process.env.ETHERSCAN_API_KEY,
    alchemyApiKey: process.env.ALCHEMY_API_KEY,
    natsUrl: process.env.NATS_URL,
    natsPort: process.env.NATS_PORT || 4222,
  };
}

export const config = generateConfig();
