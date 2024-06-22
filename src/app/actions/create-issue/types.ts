import { z } from "zod";

import { CreateIssueSchema } from "./schema";

export type IssueType = z.infer<typeof CreateIssueSchema>;
