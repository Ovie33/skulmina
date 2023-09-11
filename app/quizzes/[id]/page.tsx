"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuestionForm from "@/components/question/question-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { handleValidationError } from "@/lib/httpClient";
import notify from "@/lib/notify";
import { createManyQuestions, createQuestion } from "@/src/api/question";
import { getQuizzes } from "@/src/api/quiz";
import { QuestionFormSchema } from "@/src/schemas/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSwr from "swr";
import { z } from "zod";

const initialData = {
  questions: [
    {
      description: "",
      options: [],
    },
  ],
};

function page() {
  const { id } = useParams();
  const router = useRouter();
  const { data: quiz, mutate } = useSwr(["quiz", id], () =>
    getQuizzes(id as string)
  );
  const [
    localStorageQuestion,
    setLocalStorageQuestion,
    removeLocalStorageQuestion,
  ] = useLocalStorage(`question-${id}`, initialData);

  const initialQuestions: z.infer<typeof QuestionFormSchema> = {
    questions: [
      ...(quiz?.data?.questions || []),
      ...Array.from(localStorageQuestion),
    ],
  };

  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: localStorageQuestion,
  });

  useEffect(() => {
    form.setValue("questions", initialQuestions.questions);
  }, [quiz]);

  // Autosave form state while form is changing
  useEffect(() => {
    const subscription = form.watch((value) => {
      const saveValue = value?.questions?.filter((q) => !q?.id);
      setLocalStorageQuestion(saveValue);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: z.infer<typeof QuestionFormSchema>) => {
    try {
      await createManyQuestions(data, id as string);
      removeLocalStorageQuestion();
      mutate();
      notify.success("saved");
      router.push("/quizzes");
      return;
    } catch (err) {
      handleValidationError(err, form.setError);
      console.log(err);
    }
  };

  return (
    <DashboardLayout>
      <Card className="py-4">
        <CardContent className="flex items-center">
          <div>
            <CardTitle>{quiz?.data?.title}</CardTitle>
            <Typography variant="small">
              <Typography variant="strong">Publish Date:</Typography>
              <Typography as="span">{quiz?.data?.published_at}</Typography>
            </Typography>
          </div>
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
        </CardContent>
      </Card>

      <QuestionForm form={form} />
    </DashboardLayout>
  );
}

export default page;
