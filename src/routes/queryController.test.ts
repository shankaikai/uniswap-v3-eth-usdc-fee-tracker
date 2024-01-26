import { getTransactionEvents } from "../db/utils";
import { queryController } from "./queryController";
import { Request, Response } from "express";

jest.mock("../db/utils", () => ({
  getTransactionEvents: jest.fn(),
}));

describe("queryController", () => {
  it("should return 400 if txHash is not provided", async () => {
    const mockReq = {
      query: {},
    } as unknown as Request;

    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn });
    const mockRes = {
      status: mockStatusFn,
    } as unknown as Response;

    await queryController(mockReq, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(400);
    expect(mockJsonFn).toHaveBeenCalledWith({ msg: "txHash is required" });
  });

  it("should return 200 if txHash is provided", async () => {
    const mockReq = {
      query: {
        txHash: "0x123",
      },
    } as unknown as Request;

    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn });
    const mockRes = {
      status: mockStatusFn,
    } as unknown as Response;
    const mockData = [{ test: "test" }];
    (getTransactionEvents as jest.Mock).mockResolvedValue(mockData);

    await queryController(mockReq, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledWith({ items: [{ test: "test" }] });
  });

  it("should return 200 if txHash, startTime and endTime are provided", async () => {
    const mockReq = {
      query: {
        txHash: "0x123",
        startTime: "123",
        endTime: "456",
      },
    } as unknown as Request;

    const mockJsonFn = jest.fn();
    const mockStatusFn = jest.fn().mockReturnValue({ json: mockJsonFn });
    const mockRes = {
      status: mockStatusFn,
    } as unknown as Response;
    const mockData = [{ test: "test" }];
    (getTransactionEvents as jest.Mock).mockResolvedValue(mockData);

    await queryController(mockReq, mockRes);

    expect(mockStatusFn).toHaveBeenCalledWith(200);
    expect(mockJsonFn).toHaveBeenCalledWith({ items: [{ test: "test" }] });
  });
});
