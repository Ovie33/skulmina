import { z } from "zod";

export const quizFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(255, { message: "Title must not be lengther than 255" }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  time_limit: z
    .any()
    .transform((v) => parseInt(v))
    .pipe(
      z.number().min(20, {
        message: "time must be at least 20 seconds.",
      })
    ),
  published_at: z.coerce.date().min(new Date(), {
    message: "published date must be greater than today",
  }),
});

export const optionSchema = z.object({
  value: z.string().min(1, { message: "The option value is required" }),
  is_correct: z.boolean(),
});

export const QuestionFormSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string().optional(),
      description: z.string().min(1, { message: "the description required" }),
      options: z
        .array(optionSchema)
        .nonempty({ message: "Please add atleast one answer to this question" })
        .refine(
          // Ensure there is at least one correct option
          (options) => {
            return options.some((option) => option.is_correct);
          },
          {
            message: "At least one option must be marked as correct.",
          }
        )
        .refine(
          (options) => {
            // Ensure options are unique
            const values = options.map((option) => option.value);
            return new Set(values).size === values.length;
          },
          {
            message: "Options must be unique within a question.",
          }
        ),
    })
  ),
});
