import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { ApiParamsType } from "../lib/types";

export function QueryForm({
  params,
  setParams,
  callApi,
}: {
  params: ApiParamsType;
  setParams: (params: ApiParamsType) => void;
  callApi: () => void;
}) {
  return (
    <div className="w-1/2 flex flex-col gap-y-8">
      <Label>
        Transaction Hash (Optional)
        <Input
          placeholder="0x6f1...
        "
          className="mt-2"
          value={params.txHash}
          onChange={(e) => setParams({ ...params, txHash: e.target.value })}
        />
      </Label>
      <Label>
        Start Timestamp (Optional)
        <Input
          placeholder="1621467020"
          className="mt-2"
          value={params.startTime}
          onChange={(e) => setParams({ ...params, startTime: e.target.value })}
        />
      </Label>
      <Label>
        End Timestamp (Optional)
        <Input
          placeholder="1621467020"
          className="mt-2"
          value={params.endTime}
          onChange={(e) => setParams({ ...params, endTime: e.target.value })}
        />
      </Label>
      <Label>
        Page Size (Defaults to 50)
        <Input
          placeholder="50"
          className="mt-2"
          value={params.pageSize}
          onChange={(e) => setParams({ ...params, pageSize: e.target.value })}
        />
      </Label>
      <Button className="w-full" onClick={callApi}>
        Query!
      </Button>
    </div>
  );
}
