"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Questions } from "@/src/constant";

const ids: number[] = Questions.reduce<number[]>((p, c) => [...p, c.id], []);

const StartPage = () => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("none");
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const currentId = ids[index];
  const question = Questions[currentId];

  function updateQuestion(index: number) {
    setIndex(index);
  }

  function updateOption(value: string) {
    setAnswers((prev) => ({
      ...prev,
      [currentId]: value,
    }));
  }

  const popup = () => {
    if (display === "none") {
      setDisplay("flex");
    }
  };
  const popupCancel = () => {
    if (display === "flex") {
      setDisplay("none");
    }
  };

  return (
    <DashboardLayout>
      <section className="w-full flex overflow-hidden justify-between relative">
        <div className="p-12">
          <p className="text-xl md:text-2xl font-bold mt-12 md:mt-16 text">
            {question.description}
          </p>
          <div className="space-y-4 py-4 mt-7">
            {question.options.map((option, index) => {
              return (
                <div key={`${question.id}-${index}`}>
                  <input
                    className="peer"
                    type="radio"
                    name="option"
                    id={`option-${index}`}
                    checked={answers[currentId] === option.value}
                    onChange={() => updateOption(option.value)}
                    hidden
                  />
                  <label
                    className="block max-w-sm peer-checked:bg-primary px-4 py-2 rounded-sm border border-primary cursor-pointer hover:bg-primary"
                    htmlFor={`option-${index}`}
                  >
                    {option.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {/* ------------ */}
        {/* sidebar */}
        {/* ------------- */}
        <div className=" hidden md:block md:px-12 md:py-4 md:min-w-[250px] justify-center items-center bg-background flex flex-col text-center space-y-8 rounded-md shadow-md">
          <h1 className="flex items-center text-xl font-semibold space-x-2 mt-4">
            Timer :<span className="md:text-4xl font-bold ml-2"> 2:03</span>
          </h1>
          <h1 className="mt-2">Questions</h1>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {ids.map((num, index) => (
              <Button
                key={num}
                onClick={() => updateQuestion(index)}
                variant={
                  answers[num]
                    ? "default"
                    : num === currentId
                    ? "outline"
                    : "secondary"
                }
              >
                {num}
              </Button>
            ))}
          </div>
          <Button className="w-full" onClick={popup}>
            Submit
          </Button>
        </div>
        {/* ------------ */}
        {/* Pop up on submition */}
        {/* ------------ */}
      </section>
      <div
        className="absolute top-0 flex justify-center w-[100vw] h-[100vh] overflow-hidden items-center backdrop-blur-md"
        style={{ display }}
      >
        <div className="flex justify-center flex-col text-cneter space-y-4 bg-background px-12 py-10 rounded-md">
          <h1>Are you sure you want to end exam</h1>
          <div className="flex justify-center space-x-3">
            <Button>Yes</Button>
            <Button onClick={popupCancel}>No</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StartPage;
