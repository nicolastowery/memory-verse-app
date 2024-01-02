import { useEffect, useState } from "react";
import { usePassage } from "../context/PassageContext";
import { QuizObject } from "../types/QuizTypes";
import { getRandomValues } from "../utils/helpers";
import Input from "./Input";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;

export default function Quiz() {
  const { passage, address, isLoading } = usePassage();
  const [quiz, setQuiz] = useState<QuizObject[]>([]);
  console.log("render");
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
  }, [passage, quiz]);

  const updateQuiz = (index: number, status: "incorrect" | "correct") => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((item) =>
        item.originalIndex === index ? { ...item, answerStatus: status } : item
      )
    );
  };

  if (quiz.length > 0) {
    // const allWordsAnsweredCorrect = quiz.filter((item) => item);
    allWordsAnsweredCorrect && setQuiz((prevQuiz) => getRandomValues(prevQuiz));
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
            onQuizAnswer={updateQuiz}
          />
        )
      )}
    </div>
  );
}
