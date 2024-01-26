import { Button } from "./ui/button";

export function PaginationBar({
  page,
  increasePageIndex,
  decreasePageIndex,
  hasNextPage,
  disabled,
}: {
  page: number;
  increasePageIndex: () => void;
  decreasePageIndex: () => void;
  hasNextPage: boolean;
  disabled: boolean;
}) {
  return (
    <div className="flex gap-x-8 items-center">
      <Button
        onClick={decreasePageIndex}
        disabled={page === 0 || disabled}
        className="w-32"
      >
        Previous Page
      </Button>
      <div className="border rounded-md py-2 px-4">{page + 1}</div>
      <Button
        onClick={increasePageIndex}
        disabled={!hasNextPage || disabled}
        className="w-32"
      >
        Next Page
      </Button>
    </div>
  );
}
