import { Router } from "express";
import { queryController } from "./queryController";

export const router = Router();

/**
 * @openapi
 * /api:
 *   get:
 *     summary: Retrieves transaction events based on query parameters
 *     parameters:
 *       - in: query
 *         name: txHash
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction hash
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *         description: The start time for the query
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *         description: The end time for the query
 *     responses:
 *       200:
 *         description: A list of transaction events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TransactionEvent'
 *       400:
 *         description: If txHash is not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 */
router.get("/", queryController);
