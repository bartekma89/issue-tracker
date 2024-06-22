import React from "react";

import prisma from "@/lib/db";

import TableIssues from "./_components/table-issues";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="md:max-w-xl">
      <TableIssues data={issues} />
    </div>
  );
}

export default IssuesPage;
