"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prisma from "@/lib/db";
import { Routes } from "@/constants";

import { IssueSchema } from "../schema";
import { FormDataType } from "../types";

export const updateIssue = async (
  data: FormData,
  id: number
): Promise<FormDataType> => {
  const formData = Object.fromEntries(data);
  const { success, data: parsedData, error } = IssueSchema.safeParse(formData);

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors as FormDataType["fieldErrors"],
      message: "Missing Fields. Failed to Update Issue",
    };
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id,
      },
    });

    if (!issue) {
      return {
        error: "The issue has not been found.",
      };
    }

    await prisma.issue.update({
      where: {
        id: issue.id,
      },
      data: {
        title: parsedData.title,
        description: parsedData.description,
      },
    });

    revalidatePath(Routes.ISSUES);

    return {
      message: "The Issue Updated.",
      success: true,
    };
  } catch {
    return {
      error: "Database Error: Failed to Update Issue.",
    };
  }
};
