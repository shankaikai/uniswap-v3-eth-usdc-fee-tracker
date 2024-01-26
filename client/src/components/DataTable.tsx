import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiResponseType } from "../lib/types";

export function DataTable({ data }: { data: ApiResponseType["items"] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction Hash</TableHead>
          <TableHead>Gas Used</TableHead>
          <TableHead>Gas Price (Wei)</TableHead>
          <TableHead>Transaction Fee In ETH</TableHead>
          <TableHead>Transaction Fee In USDT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.hash}>
            <TableCell className="font-medium">{row.hash}</TableCell>
            <TableCell>{row.gasUsed}</TableCell>
            <TableCell>{row.gasPrice}</TableCell>
            <TableCell>{row.transactionFeeInETH}</TableCell>
            <TableCell className="font-medium">
              {row.transactionFeeInUSDT}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
