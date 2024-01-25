import cors from "cors";
import express from "express";
import { config } from "./config";
import { initalise } from "./lib/init";

const app = express();

app.use(cors());
app.use(express.json());

initalise();

app.get("/", async (req, res) => {
  res.send("Hello world");
});

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
