"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import QuizCard from "@/components/quiz/quiz-card";
import { ApiResponse, ExamType } from "@/types";
import { useState } from "react";
import { deleteQuiz, getQuizzes } from "@/src/api/quiz";
import useSwr from "swr";
import ExamCardSkeleton from "../../components/quiz/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import notify from "@/lib/notify";

const Examinations = () => {
  const {
    data: exams,
    mutate,
    isLoading,
  } = useSwr<ApiResponse<ExamType[]>>("quizzes", () => getQuizzes());

  const handleDelete = async (id: string | number) => {
    try {
      await deleteQuiz(id);
      mutate();
      notify.success("deleted");
      return;
    } catch (err) {
      throw err;
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex-row items-center">
          <CardTitle>All Quizzes</CardTitle>
          <Button className="ml-auto">
            <Link href={"/quizzes/create"}>Create Quiz</Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3 w-full">
          {isLoading && <ExamCardSkeleton count={6} />}
          {exams?.data?.map((exam) => (
            <QuizCard key={exam.id} quiz={exam} onDelete={handleDelete} />
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Examinations;
