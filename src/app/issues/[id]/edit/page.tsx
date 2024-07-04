import { notFound } from "next/navigation";

import prisma from "@/lib/db";

import { FormIssue } from "../../_components/form-issue";

interface EditIssuePageProps {
  params: {
    id: string;
  };
}

async function EditIssuePage({ params }: EditIssuePageProps) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return <FormIssue issue={issue} />;
}

export default EditIssuePage;
