import { FocusEvent, FocusEventHandler, useState } from "react";
import { splitSegment } from "../../utils/helpers";
import { StyledInput } from "./StyledInput";

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
  const baseWidth = block.length;
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
      <StyledInput
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        value={input}
        baseWidth={baseWidth}
        // change this to be answerStatus, but answerStatus needs to updated accordingly
        status={
          (isCorrect && attempted && "correct") ||
          (!isCorrect && attempted && "incorrect") ||
          "none"
        }
      />

      {rightSymbols + " "}
    </>
  );
}
