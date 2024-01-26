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
 *         description: The transaction hash. Example - 0xfa9cdc283025103255d322c5d0b3a15329f605a18db4dc81a6f42f84e804d1e9.
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *         description: The starting timestamp for the query. Example - 1620340000
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *         description: The ending timestamp for the query. Example - 1620347202.
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: The transaction hash of the last item in the previous page. Example - 0xfa9cdc283025103255d322c5d0b3a15329f605a18db4dc81a6f42f84e804d1e9.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: string
 *         description: The page size for the query. Defaults to 50.
 *     responses:
 *       200:
 *         description: A list of transaction events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionEvent'
 */
router.get("/", queryController);
