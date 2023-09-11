"use client";

import { Button } from "@/components/ui/button";
import { ExamType } from "@/types";
import ConfirmButton from "../widget/confirm-button";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import useLoading from "@/hooks/useLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import Typography from "../ui/typography";
import Link from "next/link";

type QuizCardProps = {
  quiz: ExamType;
  onDelete?: (id: string | number) => Promise<any>;
};

const QuizCard = ({ quiz, onDelete }: QuizCardProps) => {
  const [deleteLoading, startDeleteLoading] = useLoading();

  const handleDelete = () => {
    const stopLoading = startDeleteLoading();
    if (onDelete) return onDelete(quiz.id).finally(() => stopLoading);
  };

  return (
    <Card className="bg-secondary flex flex-col justify-between">
      <CardHeader>
        <Typography variant="h4">{quiz.title}</Typography>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex flex-col gap-0">
          <Typography as="span">
            Questions: {quiz?.questions?.length}
          </Typography>
          <Typography as="span">Minutes: {quiz.time_limit}</Typography>
          <Typography as="span">Code: {quiz.code}</Typography>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} size={"sm"}>
          <Link href={`quizzes/${quiz.id}/edit`}>
            <Pencil size={14} />
          </Link>
        </Button>
        <ConfirmButton
          disabled={deleteLoading}
          variant={"outline"}
          size={"sm"}
          onConfirm={handleDelete}
          title="Delete"
        >
          {deleteLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </ConfirmButton>
        <Button
          size={"sm"}
          className="ml-auto group/1"
          title="Add new question"
        >
          <Link href={`/quizzes/${quiz.id}`}>
            <Plus size={14} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
