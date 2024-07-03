import { notFound } from "next/navigation";

import prisma from "@/lib/db";
import { EditIssueButton, IssueDetails } from "./_components";

interface IssueDetailsProps {
  params: {
    id: string;
  };
}

async function IssueDetailsPage({ params }: IssueDetailsProps) {
  if (/[a-zA-Z]/.test(params.id)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div className="md:grid grid-cols-2">
      <div>
        <IssueDetails issue={issue} />
      </div>
      <div className="max-md:mt-5">
        <EditIssueButton issueId={issue.id} />
      </div>
    </div>
  );
}

export default IssueDetailsPage;
