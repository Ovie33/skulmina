"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { createQuiz } from "@/src/api/quiz";
import { Card, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizFormSchema } from "@/src/schemas/quiz";
import { useRouter } from "next/navigation";
import { handleValidationError } from "@/lib/httpClient";
import QuizForm from "../../../components/quiz/quiz-form";

function CreateQuizPage() {
  const form = useForm<z.infer<typeof quizFormSchema>>({
    resolver: zodResolver(quizFormSchema),
  });

  const redirect = useRouter();

  const onSubmit = (data: z.infer<typeof quizFormSchema>) => {
    createQuiz(data)
      .then((res) => redirect.push("/quizzes"))
      .catch((err) => handleValidationError(err, form.setError));
  };
  return (
    <DashboardLayout>
      <Typography variant="h3" className="mb-4">
        Create New Quiz
      </Typography>
      <Card>
        <CardContent className="py-4">
          <QuizForm form={form} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default CreateQuizPage;
