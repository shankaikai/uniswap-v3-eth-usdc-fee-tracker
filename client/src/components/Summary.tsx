import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SummaryResponseType } from "../lib/types";
import { useEffect } from "react";

export function Summary() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const response = await axios.get<SummaryResponseType>(
        `${
          import.meta.env.MODE === "development" ? "http://localhost:3001" : ""
        }/api/summary`
      );
      return response.data;
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="flex flex-col gap-y-4 p-4 border rounded-md">
      <h2 className="font-bold">Summary statistics</h2>
      <p>Updates every second</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <>
          <p>Current ETH/USDT Price: {data?.currentETHUSDTPrice}</p>
          <p>
            Total Transaction Fee (USDT):{" "}
            {data?.totalTransactionFeeInUSDT.toFixed(2)}
          </p>
          <p>
            Total Transaction Fee (ETH):{" "}
            {data?.totalTransactionFeeInETH.toFixed(2)}
          </p>
        </>
      ) : (
        <p>No data available yet.</p>
      )}
    </div>
  );
}
