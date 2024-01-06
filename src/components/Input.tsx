import React, { FocusEvent, FocusEventHandler, useState } from "react";
import { splitSegment } from "../utils/helpers";

interface InputProps {
  block: string;
  index: number;
  answerStatus: "correct" | "incorrect" | "none";
  onQuizAnswer: (index: number, status: "correct" | "incorrect") => void;
}

export default function Input({
  block,
  index,
  answerStatus,
  onQuizAnswer,
}: InputProps) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState<boolean>(
    answerStatus === "none" && false
  );
  const [input, setInput] = useState("");
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

  if (
    answerStatus === "none" &&
    input !== "" &&
    isCorrect === true &&
    attempted === true
  ) {
    setInput("");
    setAttempted(false);
  }

  return (
    <>
      {leftSymbols}
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        value={input}
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
