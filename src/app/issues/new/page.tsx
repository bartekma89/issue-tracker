"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

function NewIssuePage() {
  const form = useForm();

  return (
    <Form {...form}>
      <form action="" className="max-w-xl space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Title" />
                </FormControl>
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
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit New Issue</Button>
      </form>
    </Form>
  );
}

export default NewIssuePage;
