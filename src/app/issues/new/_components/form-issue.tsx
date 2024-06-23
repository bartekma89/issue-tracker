"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createIssue } from "@/app/actions/create-issue";
import { CreateIssueSchema } from "@/app/actions/create-issue/schema";
import { IssueType } from "@/app/actions/create-issue/types";
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

import "easymde/dist/easymde.min.css";
import { Callout } from "./callout";

const MDXEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-7">
      <LoadingSpinner />
    </div>
  ),
});

export function FormIssue() {
  const router = useRouter();
  const form = useForm<IssueType>({
    resolver: zodResolver(CreateIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const [errors, setErrors] = useState<FieldErrors<IssueType> | string>();

  const { handleSubmit, formState, control } = form;

  const onSubmit = async (data: IssueType): Promise<void> => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    setErrors(undefined);

    const response = await createIssue(formData);

    if (response.success) {
      router.push(Routes.ISSUES);
    }

    if (response.fieldErrors) {
      setErrors(response.fieldErrors);
    }
    if (response.error) {
      setErrors(response.error);
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
          Submit New Issue{" "}
          {formState.isSubmitting && (
            <LoadingSpinner className="w-6 h-6 ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
}
