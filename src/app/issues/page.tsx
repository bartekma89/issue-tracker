import React from "react";
import Link from "next/link";

import prisma from "@/lib/db";

import { Button } from "@/components/ui/button";

import TableIssues from "./_components/table-issues";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="md:max-w-xl">
      <div>
        <Button className="mb-5">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <TableIssues data={issues} />
    </div>
  );
}

export default IssuesPage;
