"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createIssue } from "@/app/actions/issue/create-issue";
import { IssueSchema } from "@/app/actions/issue/schema";
import { IssueType } from "@/app/actions/issue/types";
import { FieldErrors } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Routes } from "@/constants";

import { Callout } from "../new/_components/callout";

import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";
import { updateIssue } from "@/app/actions/issue/update-issue";

const MDXEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-7">
      <LoadingSpinner />
    </div>
  ),
});

interface FormIssueProps {
  issue?: Issue;
}

export function FormIssue({ issue }: FormIssueProps) {
  const router = useRouter();
  const form = useForm<IssueType>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: issue?.title ?? "",
      description: issue?.description ?? "",
    },
  });
  const [errors, setErrors] = useState<FieldErrors<IssueType> | string>();

  const { handleSubmit, formState, control } = form;

  const onSubmit = async (data: IssueType): Promise<void> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    setErrors(undefined);

    let response;

    if (issue) {
      response = await updateIssue(formData, issue.id);
    } else {
      response = await createIssue(formData);
    }

    if (response.success) {
      router.push(Routes.ISSUES);
    } else if (response.error) {
      setErrors(response.error);
    }

    if (response.fieldErrors) {
      setErrors(response.fieldErrors);
    }
  };

  return (
    <Form {...form}>
      <Callout<IssueType> errors={errors} className="max-w-xl mb-3" />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
        <FormField
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <MDXEditor {...field} placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {formState.isSubmitting && (
            <LoadingSpinner className="w-6 h-6 ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
}
