import { MDXRemote } from "next-mdx-remote/rsc";
import { Issue } from "@prisma/client";

import { IssueStatus } from "../../_components";
import { LinkHandler } from "../_components";

interface IssueDetailsProps {
  issue: Issue;
}

export function IssueDetails({ issue }: IssueDetailsProps) {
  return (
    <div className="space-y-4">
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
