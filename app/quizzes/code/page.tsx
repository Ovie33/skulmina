"use client";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";

const ExamCode = () => {
  const [form, setForm] = useState({
    code: "",
  });
  const handleFormUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <DashboardLayout>
      <section>
        <form className="space-y-3 flex flex-col justify-center" action="#">
          <Input
            value={form?.code}
            onChange={handleFormUpdate}
            type="text"
            name="code"
            placeholder="Enter Exam Code"
          />
          <Button className="bg-destructive">Start Exam</Button>
        </form>
      </section>
    </DashboardLayout>
  );
};

export default ExamCode;
