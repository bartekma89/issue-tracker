"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";
import { Routes } from "@/constants";

import { FormDataType } from "../types";
import { IssueSchema } from "../schema";

export const createIssue = async (data: FormData): Promise<FormDataType> => {
  const formData = Object.fromEntries(data);
  const { success, data: parsedData, error } = IssueSchema.safeParse(formData);

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors as FormDataType["fieldErrors"],
      message: "Missing Fields. Failed to Create Issue.",
    };
  }

  try {
    await prisma.issue.create({
      data: {
        title: parsedData.title,
        description: parsedData.description,
      },
    });

    revalidatePath(Routes.ISSUES);

    return {
      message: "The Issue Created.",
      success: true,
    };
  } catch {
    return {
      error: "Database Error: Failed to Create Issue.",
      success: false,
    };
  }
};
