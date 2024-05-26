import React, { useState } from "react";
import useMCQ from "../../0.hooks/useMCQ";
import useShortQuestions from "../../0.hooks/useShortQuestions";

const ShortQuestion = () => {
  const [shortQuestions] = useShortQuestions();

  return (
    <div className="container mx-auto py-8">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
        {shortQuestions.questions?.map((question, index) => (
          <div key={index} className="rounded-lg shadow-md p-6 bg-white">
            <p className="text-lg font-semibold mb-2">
              {" "}
              {index + 1}. {question.question}
            </p>
            <p className="text-gray-600">{question.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ShortQuestion;
