import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import prisma from "@/lib/db";

import { LoadingFormSkeleton } from "@/app/issues/_components";

const FormIssue = dynamic(() => import("@/app/issues/_components/form-issue"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

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
