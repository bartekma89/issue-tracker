import prisma from "@/lib/db";

import { ButtonsActions, TableIssues } from "./_components";

export async function generateStaticParams() {
  const issues = await prisma.issue.findMany();

  return issues.map((issue) => ({ id: issue.id }));
}

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <ButtonsActions />
      {issues.length === 0 ? (
        <div>There is no issues</div>
      ) : (
        <TableIssues data={issues} />
      )}
    </div>
  );
}

export default IssuesPage;
