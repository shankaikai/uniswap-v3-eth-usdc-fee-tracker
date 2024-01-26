import { Router } from "express";
import { queryController } from "./queryController";

export const router = Router();

router.get("/", queryController);
