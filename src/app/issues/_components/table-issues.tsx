import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Issue } from "@prisma/client";

import { Routes } from "@/constants";
import { IssueStatus } from "./issue-status";

interface TableIssuesProps {
  data: Issue[];
}

export function TableIssues({ data }: TableIssuesProps) {
  return (
    <Table className="border">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ createdAt, title, status, id }) => {
          return (
            <TableRow key={createdAt.toString()}>
              <TableCell>
                <Button variant="link" className="text-black">
                  <Link href={`${Routes.ISSUES}/${id}`}>{title}</Link>
                </Button>
                <div className="block md:hidden">
                  <IssueStatus status={status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatus status={status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
