import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./components/DataTable";
import { PaginationBar } from "./components/PaginationBar";
import { QueryForm } from "./components/QueryForm";
import { useState } from "react";
import { ApiParamsType, ApiResponseType } from "./lib/types";
import { Summary } from "./components/Summary";

function App() {
  const [params, setParams] = useState<ApiParamsType>({ pageIndex: 0 });
  function increasePageIndex() {
    console.log("here");
    setParams((prev) => ({
      ...prev,
      pageIndex: (prev.pageIndex as number) + 1,
    }));
    callApi();
  }
  function decreasePageIndex() {
    setParams((prev) => ({
      ...prev,
      pageIndex: (prev.pageIndex as number) - 1,
    }));
    callApi();
  }
  const {
    data,
    isPending,
    isError,
    mutate: callApi,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.get<ApiResponseType>(
        `${
          import.meta.env.MODE === "development" ? "http://localhost:3001" : ""
        }/api`,
        {
          params: {
            pageIndex: params.pageIndex ? params.pageIndex : undefined,
            pageSize: params.pageSize ? params.pageSize : undefined,
            txHash: params.txHash ? params.txHash : undefined,
            startTime: params.startTime ? params.startTime : undefined,
            endTime: params.endTime ? params.endTime : undefined,
          },
        }
      );
      return response.data.items;
    },
  });

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-10">
      <h1 className="text-4xl text-center font-medium">
        Uniswap V3 ETH/USDC Transaction Fee Tracker
      </h1>
      <span>
        Note: Values might change and not be as accurate as historical data is
        still currently being pulled. Some fees might be 0 due to inaccurate
        pulling of prices.
      </span>
      <Summary />
      <QueryForm params={params} setParams={setParams} callApi={callApi} />
      {isError && (
        <div className="h-64 flex items-center">
          An error occured. Please try again.
        </div>
      )}
      {isPending && <div className="h-64 flex items-center">Loading...</div>}
      {data ? (
        <DataTable data={data} />
      ) : (
        <div className="h-64 flex items-center">Make a query to see data.</div>
      )}
      <PaginationBar
        page={params.pageIndex ?? 0}
        increasePageIndex={increasePageIndex}
        decreasePageIndex={decreasePageIndex}
        hasNextPage={data?.length !== 0}
        disabled={isPending || !data}
      />
    </div>
  );
}

export default App;
