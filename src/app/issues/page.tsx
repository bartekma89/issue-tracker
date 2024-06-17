import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function IssuesPage() {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
}

export default IssuesPage;
