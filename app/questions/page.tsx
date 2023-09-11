"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuestionTable from "@/components/question/question-table";
import useSwr from "swr";
import { deleteQuestion, getQuestions } from "@/src/api/question";
import { ApiResponse, QuestionType } from "@/types";
import Typography from "@/components/ui/typography";
import notify from "@/lib/notify";

function Question() {
  const [page, setPage] = useState("1");

  const {
    data: questions,
    isLoading,
    mutate,
  } = useSwr<ApiResponse<QuestionType[]>>(["questions", page], () =>
    getQuestions("", { page })
  );

  function setpageFromUrl(urlString: string | null) {
    if (!urlString) return;
    const url = new URL(urlString || "");
    setPage(url.searchParams.get("page") as string);
  }

  const handleDelete = async (id: number | string) => {
    await deleteQuestion(id);
    notify.success("Deleted");
    mutate();
  };

  return (
    <DashboardLayout>
      <Card className="mb-6">
        <CardHeader className="flex-row items-center">
          <Typography variant="h4">Question Bank</Typography>
          <Button className="ml-auto">
            <Link href={"/questions/create"}>Create Question</Link>
          </Button>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="w-full py-4">
          <QuestionTable
            loading={isLoading}
            questions={questions?.data || []}
            onDelete={handleDelete}
          />
          <div className="mt-4 flex items-center justify-center gap-1">
            {questions?.meta?.links?.map((link, index) => (
              <Button
                disabled={link?.active}
                variant={link?.active ? "outline" : "ghost"}
                onClick={() => setpageFromUrl(link?.url)}
              >
                {index === 0
                  ? "Prev"
                  : index + 1 === questions?.meta?.links?.length
                  ? "Next"
                  : link?.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

export default Question;
