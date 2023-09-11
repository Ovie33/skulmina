import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { z } from "zod";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

type MultiChoiceInputProps = {
  form: UseFormReturn<z.infer<typeof QuestionFormSchema>, any, undefined>;
  index: number;
  field?: FieldArrayWithId<
    z.infer<typeof QuestionFormSchema>,
    "questions",
    "id"
  >;
  name: string;
};

function MultiChoiceInput({
  form,
  index: parentIndex,
  name,
}: MultiChoiceInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `questions.${parentIndex}.${name}` as any,
  });

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center">
          <FormField
            name={`questions.${parentIndex}.${name}.${index}.value`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Option {index + 1}</FormLabel>
                <div className="flex">
                  <Button
                    className="rounded-r-none border-r-none"
                    variant={"outline"}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <Minus size={14} />
                  </Button>
                  <Input
                    {...field}
                    id={field.name}
                    className="rounded-l-none rounded-r-none border-x-0"
                    placeholder={`Choice ${index + 1}`}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={field.id}
            name={`questions.${parentIndex}.${name}.${index}.is_correct`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel htmlFor={field.name}>correct</FormLabel>
                <span className="flex border p-2 rounded-l-none">
                  <Switch
                    id={field.name}
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    placeholder={`Choice ${index + 1}`}
                  />
                </span>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        className="w"
        variant={"outline"}
        type="button"
        onClick={() => append({ value: "Option", is_correct: false })}
      >
        <Plus size={14} /> Add Option
      </Button>
    </>
  );
}

export default MultiChoiceInput;
