import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Routes } from "@/constants";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <Pencil className="h-4 w-4 mr-2" />
      <Link href={`${Routes.ISSUES}/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
}
