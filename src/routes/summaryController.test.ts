import { Request, Response } from "express";
import { summaryController } from "./summaryController";

jest.mock("../db/utils", () => ({
  getTotalTransactionFeeInETH: jest.fn().mockResolvedValue(123),
  getTotalTransactionFeeInUSDT: jest.fn().mockResolvedValue(456),
}));

jest.mock("../lib/utils", () => ({
  getETHUSDTPrice: jest.fn().mockResolvedValue(789),
}));

describe("summaryController", () => {
  it("should return 200 with correct response", async () => {
    const mockReq = {
      query: {},
    } as unknown as Request;

    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn });
    const mockRes = {
      status: mockStatusFn,
    } as unknown as Response;

    await summaryController(mockReq, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledWith({
      currentETHUSDTPrice: 789,
      totalTransactionFeeInETH: 123,
      totalTransactionFeeInUSDT: 456,
    });
  });
});
