import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .trim()
    .min(3, {
      message: "Title needs to have min 3 characters",
    }),
  description: z.string({ message: "Description is required" }).trim().min(5, {
    message: "Description needs to have min 5 characters",
  }),
});
