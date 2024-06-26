import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Routes } from "@/constants";

export function ButtonsActions() {
  return (
    <div className="mb-5">
      <Button>
        <Link href={Routes.NEW_ISSUE}>New Issue</Link>
      </Button>
    </div>
  );
}
