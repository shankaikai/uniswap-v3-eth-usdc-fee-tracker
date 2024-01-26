import { DataTable } from "./components/DataTable";
import { PaginationBar } from "./components/PaginationBar";
import { QueryForm } from "./components/QueryForm";

function App() {
  
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-10">
      <h1 className="text-4xl text-center font-medium">
        Uniswap V3 ETH/USDC Transaction Fee Tracker
      </h1>
      <QueryForm />
      <DataTable />
      <PaginationBar />
    </div>
  );
}

export default App;
