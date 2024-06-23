import prisma from "@/lib/db";

import { ButtonsActions, TableIssues } from "./_components";

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
