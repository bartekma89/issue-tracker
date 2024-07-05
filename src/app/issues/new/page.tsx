import dynamic from "next/dynamic";
import { LoadingFormSkeleton } from "../_components";

// import { FormIssue } from "./_components";

const FormIssue = dynamic(() => import("@/app/issues/_components/form-issue"), {
  ssr: false,
  loading: () => <LoadingFormSkeleton />,
});

function NewIssuePage() {
  return <FormIssue />;
}

export default NewIssuePage;
