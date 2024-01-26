import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SummaryResponseType } from "../lib/types";

export function Summary() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: async () => {
      const response = await axios.get<SummaryResponseType>(
        "http://localhost:3001/api/summary"
      );
      return response.data;
    },
  });
  return (
    <div className="flex flex-col gap-y-4 p-4 border rounded-md">
      <h2 className="font-bold">Summary statistics</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
}
