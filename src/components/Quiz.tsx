import { useEffect, useState } from "react";
import { usePassage } from "../context/PassageContext";
import { QuizObject } from "../types/QuizTypes";
import { getRandomValues } from "../utils/helpers";
import Input from "./Input";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;

export default function Quiz() {
  const { passage, address, isLoading, fetchVerse } = usePassage();
  const [quiz, setQuiz] = useState<QuizObject[]>([]);

  useEffect(() => {
    if (passage.length > 0 && quiz.length === 0) {
      const newQuizInput: QuizObject[] = passage.map((p, i) => ({
        block: p,
        word: p.match(regex)![0],
        originalIndex: i,
        selected: false,
        answerStatus: "none",
      }));
      console.log(newQuizInput);
      setQuiz(getRandomValues(newQuizInput));
    }
  }, [passage, quiz.length]);

  const updateQuiz = (index: number, status: "incorrect" | "correct") => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((item) =>
        item.originalIndex === index ? { ...item, answerStatus: status } : item
      )
    );
  };

  // This is for adding more words to the quiz after all the current words have been answered correctly
  if (quiz.length > 0) {
    console.log("running check");
    const allCurrentQuizWords = quiz.filter((q) => q.selected === true);
    const correctlyAnsweredQuizWords = allCurrentQuizWords.filter(
      (q) => q.answerStatus === "correct"
    );
    if (correctlyAnsweredQuizWords.length === quiz.length) {
      fetchVerse();
    } else if (
      allCurrentQuizWords.length === correctlyAnsweredQuizWords.length
    ) {
      const newQuizInput: QuizObject[] = quiz.map((q) => ({
        ...q,
        answerStatus: "none",
      }));

      setQuiz(getRandomValues(newQuizInput));
    }
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div>{address}</div>
      <br />
      {quiz.map((q) =>
        !q.selected ? (
          q.block + " "
        ) : (
          <Input
            key={q.originalIndex}
            index={q.originalIndex}
            block={q.block}
            answerStatus={q.answerStatus}
            onQuizAnswer={updateQuiz}
          />
        )
      )}
    </div>
  );
}
