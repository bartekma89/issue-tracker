import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  const issuesItems = [1, 2, 3, 4, 5];
  return (
    <div className="md:max-w-xl">
      <Table className="border">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issuesItems.map((issue) => (
            <TableRow key={issue}>
              <TableCell>
                <Skeleton className="h-5 w-auto" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-5 w-auto" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-5 w-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
