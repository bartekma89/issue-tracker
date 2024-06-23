import React from "react";

import prisma from "@/lib/db";

import { ButtonsActions } from "./_components/buttons-actions";
import { TableIssues } from "./_components/table-issues";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <ButtonsActions />
      <TableIssues data={issues} />
    </div>
  );
}

export default IssuesPage;
