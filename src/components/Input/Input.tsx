import {
  FocusEvent,
  FocusEventHandler,
  useState,
  ForwardedRef,
  ChangeEvent,
} from "react";
import { splitSegment } from "../../utils/helpers";
import { StyledInput } from "./StyledInput";

interface InputProps {
  block: string;
  index: number;
  answerStatus: "correct" | "incorrect" | "none";
  onQuizAnswer: (index: number, status: "correct" | "incorrect") => void;
  forwardedRef: ForwardedRef<HTMLInputElement | null> | null;
}

export default function Input({
  block,
  index,
  answerStatus,
  onQuizAnswer,
  forwardedRef,
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(forwardedRef === null);
    console.log(e.target.value);
    setInput(e.target.value);

    if (e.target.value !== "") {
      setAttempted(true);
    } else {
      setAttempted(false);
    }
    if (e.target.value.toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      onQuizAnswer(index, "correct");
    }
  };

  if (
    answerStatus === "none" &&
    input !== "" &&
    isCorrect === true &&
    attempted === true
  ) {
    console.log("");
    setInput("");
    setAttempted(false);
    setIsCorrect(false);
  }

  return (
    <>
      {leftSymbols}
      {forwardedRef && (
        <StyledInput
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={input}
          baseWidth={baseWidth}
          // change this to be answerStatus, but answerStatus needs to updated accordingly
          status={
            (isCorrect && attempted && "correct") ||
            (!isCorrect && attempted && "incorrect") ||
            "none"
          }
          ref={forwardedRef}
        />
      )}
      {!forwardedRef && (
        <StyledInput
          type="text"
          value={input}
          baseWidth={baseWidth}
          answer={answer}
          // change this to be answerStatus, but answerStatus needs to updated accordingly
          status={
            (isCorrect && attempted && "correct") ||
            (!isCorrect && attempted && "incorrect") ||
            "none"
          }
          disabled
        />
      )}

      {rightSymbols + " "}
    </>
  );
}
