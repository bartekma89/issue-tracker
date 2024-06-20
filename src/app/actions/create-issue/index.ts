"use server";

import { createIssueSchema } from "./schema";
import prisma from "@/lib/db";

type FormDataType = {
  message: string;
  id?: number;
  issues?: string[];
};

export const createIssue = async (data: FormData): Promise<FormDataType> => {
  const formData = Object.fromEntries(data);
  const {
    success,
    data: parsedData,
    error,
  } = createIssueSchema.safeParse(formData);

  if (!success) {
    return {
      message: "Invalid Data.",
      issues: error.issues.map((issue) => issue.message),
    };
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
      },
    });

    return {
      id: newIssue.id,
      message: "Issue Created.",
    };
  } catch {
    return {
      message: "Database Error: Failed to Create Issue.",
    };
  }
};
