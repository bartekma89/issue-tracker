import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";

interface IssueStatusProps {
  status: Status;
}

const mapStatus: Record<Status, { label: string; variant: Status }> = {
  [Status.OPEN]: {
    label: "Opened",
    variant: Status.OPEN,
  },
  [Status.IS_PROGRESS]: {
    label: "In Progress",
    variant: Status.IS_PROGRESS,
  },
  [Status.CLOSED]: {
    label: "Closed",
    variant: Status.CLOSED,
  },
};

export function IssueStatus({ status }: IssueStatusProps) {
  return (
    <Badge variant={mapStatus[status].variant}>{mapStatus[status].label}</Badge>
  );
}
