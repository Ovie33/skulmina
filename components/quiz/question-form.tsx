import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import MultiChoiceInput from "./multi-choice-input";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "../ui/card";
import Typography from "../ui/typography";
import { Plus, X } from "lucide-react";

type QuestionFormProps = {
  form: UseFormReturn<z.infer<typeof QuestionFormSchema>, any, undefined>;
  onSubmit: (data: z.infer<typeof QuestionFormSchema>) => void;
  limit?: number;
};

function QuestionForm({ form, limit = 10 }: QuestionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const addNewQuestionForm = () => {
    if (form.getValues().questions.length >= limit) {
      return alert("Limit of questions exceeded");
    }
    append({
      description: "",
      options: [{ value: "", is_correct: false }],
    });
  };

  return (
    <div>
      {fields.map((field, index) => (
        <Card key={field.id} className="my-4 p-2">
          <CardHeader className="flex-row items-center">
            <Typography variant="h4">Question {1 + index}</Typography>
            <Button
              className="ml-auto block"
              onClick={() => remove(index)}
              variant={"outline"}
              size={"sm"}
            >
              <X size={14} />
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-3">
                {/* Start Error Message */}
                <FormField
                  name={`questions.${index}.options.root`}
                  render={({ field }) => (
                    <FormMessage className="bg-destructive text-destructive-foreground p-4 rounded-md" />
                  )}
                />
                {/* End Error Message */}

                <FormField
                  name={`questions.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        placeholder="Write question here"
                        className="resize-none"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MultiChoiceInput name="options" form={form} index={index} />
              </form>
            </Form>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addNewQuestionForm}
        variant={"outline"}
        className="w-full mt-4 border-dotted border py-8"
      >
        <Plus size={12} />
      </Button>
    </div>
  );
}

export default QuestionForm;
