"use server";

import { FieldErrors } from "@/app/types";
import prisma from "@/lib/db";

import { IssueType } from "./types";
import { CreateIssueSchema } from "./schema";

type FormDataType = {
  fieldErrors?: FieldErrors<IssueType>;
  message?: string;
  success?: number;
  error?: string;
};

export const createIssue = async (data: FormData): Promise<FormDataType> => {
  const formData = Object.fromEntries(data);
  const {
    success,
    data: parsedData,
    error,
  } = CreateIssueSchema.safeParse(formData);

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors as FieldErrors<IssueType>,
      message: "Missing Fields. Failed to Create Issue.",
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
      message: "The Issue Created.",
      success: newIssue.id,
    };
  } catch {
    return {
      error: "Database Error: Failed to Create Issue.",
    };
  }
};
