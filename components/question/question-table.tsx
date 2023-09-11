import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { Edit3, Loader, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import ConfirmButton from "../widget/confirm-button";
import { Checkbox } from "../ui/checkbox";
import { QuestionType } from "@/types";
import { useRouter } from "next/navigation";

type QuestionTableProps = {
  questions: QuestionType[];
  loading?: boolean;
  onDelete: (id: string | number) => Promise<any>;
};

function QuestionTable({ questions, loading, onDelete }: QuestionTableProps) {
  return (
    <Card>
      <CardContent className="relative">
        <Table className="mt-5">
          <TableHeader className="font-bold uppercase tracking-widest">
            <TableRow>
              <TableHead className="flex items-center justify-start gap-3">
                <Checkbox />
              </TableHead>

              <TableHead>
                <span className="text-xs">Question</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="text-xs">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions?.map(({ id, description }, index) => (
              <TableRow key={id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{description}</TableCell>
                <TableCell className="flex items-center justify-end gap-1">
                  <ConfirmButton
                    onConfirm={() => onDelete(id)}
                    variant="destructive"
                    size={"sm"}
                  >
                    <Trash2 size={14} />
                  </ConfirmButton>

                  <Button variant="default" size={"sm"}>
                    <Edit3 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="absolute inset-0 bg-muted opacity-50 grid place-items-center">
            <Loader size={24} className="animate-spin mx-auto" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default QuestionTable;
