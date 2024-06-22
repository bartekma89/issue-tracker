import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FieldErrors } from "@/app/types";

interface CalloutProps<T> {
  errors?: FieldErrors<T> | string;
  className?: string;
}

export function Callout<T extends object>({
  errors,
  className = "",
}: CalloutProps<T>) {
  if (!errors) {
    return null;
  }

  const renderErrors = () => {
    if (typeof errors === "string") {
      return <AlertDescription>{errors}</AlertDescription>;
    }

    return Object.entries(errors).map((item) => {
      const [key, error] = item as [string, string[]];
      return (
        <AlertDescription key={key}>{error[0] as string}</AlertDescription>
      );
    });
  };

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      {renderErrors()}
    </Alert>
  );
}
