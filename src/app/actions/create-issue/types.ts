import { z } from "zod";

import { createIssueSchema } from "./schema";

export type IssueFormType = z.infer<typeof createIssueSchema>;
