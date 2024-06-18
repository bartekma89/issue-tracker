"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createIssueSchema } from "@/app/actions/create-issue/schema";
import { IssueFormType } from "@/app/actions/create-issue/types";
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

import "easymde/dist/easymde.min.css";

const MDXEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center p-7">
      <LoadingSpinner />
    </div>
  ),
});

export const FormIssue = () => {
  const form = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.warn(data);
        })}
        className="max-w-xl space-y-3">
        <FormField
          control={form.control}
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
          control={form.control}
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
        <Button type="submit">Submit New Issue</Button>
      </form>
    </Form>
  );
};
