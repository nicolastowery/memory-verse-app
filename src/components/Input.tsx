import React, { FocusEvent, FocusEventHandler, useState } from "react";
import { splitSegment } from "../utils/helpers";

interface InputProps {
  block: string;
  index: number;
  onQuizAnswer: (index: number, status: "correct" | "incorrect") => void;
}

export default function Input({ block, index, onQuizAnswer }: InputProps) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [leftSymbols, answer, rightSymbols] = splitSegment(block);

  const handleBlur: FocusEventHandler = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setAttempted(true);
    } else {
      setAttempted(false);
    }
    if (e.target.value.toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onQuizAnswer(index, "correct");
    } else {
      setIsCorrect(false);
      onQuizAnswer(index, "incorrect");
    }
  };

  return (
    <>
      {leftSymbols}
      <input
        type="text"
        onBlur={handleBlur}
        className={
          (isCorrect && attempted && "input--correct") ||
          (!isCorrect && attempted && "input--incorrect") ||
          ""
        }
      />
      {rightSymbols + " "}
    </>
  );
}
