import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { quizFormSchema } from "@/src/schemas/quiz";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import Typography from "../ui/typography";
import { Loader } from "lucide-react";

type QuizFormProps = {
  form: UseFormReturn<z.infer<typeof quizFormSchema>>;
  onSubmit: (data: z.infer<typeof quizFormSchema>) => void;
};

function QuizForm({ form, onSubmit }: QuizFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Quiz Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            name="time_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total quiz time in seconds"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="published_at"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none min-h-[250px]"
                  placeholder="Write your instructions here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
          className="ml-auto"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader size={14} className="animate-spin" />
              <span>Please Wait</span>
            </>
          ) : (
            <span>Save</span>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default QuizForm;
