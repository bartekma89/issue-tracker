import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import prisma from "@/lib/db";
import { IssueStatus } from "../_components";
import { LinkHandler } from "./_components";

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
    <div className="space-y-4 max-w-xl">
      <h2 className="text-3xl font-bold">{issue.title}</h2>
      <div className="flex space-x-3">
        <IssueStatus status={issue.status} />
        <p className="text-lg">{issue.createdAt.toDateString()}</p>
      </div>
      <article className="border p-3 rounded-md prose lg:prose-xl">
        <MDXRemote
          source={issue.description}
          components={{
            a: ({ href, children }) => (
              <LinkHandler href={href}>{children}</LinkHandler>
            ),
          }}
        />
      </article>
    </div>
  );
}

export default IssueDetailsPage;
