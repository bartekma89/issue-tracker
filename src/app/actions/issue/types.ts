import { z } from "zod";

import { IssueSchema } from "./schema";
import { FieldErrors } from "@/app/types";

export type IssueType = z.infer<typeof IssueSchema>;

export type FormDataType = {
  fieldErrors?: FieldErrors<IssueType>;
  message?: string;
  success?: boolean;
  error?: string;
};
