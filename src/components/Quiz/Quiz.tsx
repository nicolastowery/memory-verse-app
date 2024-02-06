import { useEffect, useState, useRef } from "react";
import { usePassage } from "../../context/PassageContext";
import { QuizObject } from "../../types/QuizTypes";
import { getRandomValues } from "../../utils/helpers";
import Spinner from "../Spinner/Spinner";
import Input from "../Input/Input";
import styles from "./Quiz.module.css";

const REGEX = /[a-zA-Z0-9]+(?![^[]*])\b/g;

interface QuizProps {
  isFlipped: boolean;
}

export default function Quiz({ isFlipped }: QuizProps) {
  const { passage, address, isLoading, fetchVerse } = usePassage();
  const [quiz, setQuiz] = useState<QuizObject[]>([]);
  const [currentInput, setCurrentInput] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const quizInputs = quiz.filter((q) => q.selected);

  useEffect(() => {
    if (isFlipped && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFlipped, currentInput]);

  useEffect(() => {
    // Checking the length of the quiz and passage is not fool-proof
    // Best to devise a helper function that compares the data within the two string arrays to
    if (
      passage.length > 0 &&
      (quiz.length === 0 || quiz.length !== passage.length)
    ) {
      const newQuizInput: QuizObject[] = passage.map((p, i) => ({
        block: p,
        word: p.match(REGEX)![0],
        originalIndex: i,
        selected: false,
        answerStatus: "none",
      }));
      setQuiz(getRandomValues(newQuizInput));
    }
  }, [passage, quiz.length]);

  const updateQuiz = (index: number, status: "incorrect" | "correct") => {
    status === "correct" && setCurrentInput((cur) => cur + 1);

    setQuiz((prevQuiz) =>
      prevQuiz.map((item) =>
        item.originalIndex === index ? { ...item, answerStatus: status } : item
      )
    );
  };

  // This is for adding more words to the quiz after all the current words have been answered correctly
  if (quiz.length > 0) {
    const allCurrentQuizWords = quiz.filter((q) => q.selected === true);
    const correctlyAnsweredQuizWords = allCurrentQuizWords.filter(
      (q) => q.answerStatus === "correct"
    );

    // If the entire quiz has been correctly answered, generate a new quiz
    if (
      correctlyAnsweredQuizWords.length === quiz.length &&
      passage.length === quiz.length
    ) {
      fetchVerse();
    } else if (
      allCurrentQuizWords.length === correctlyAnsweredQuizWords.length
    ) {
      const newQuizInput: QuizObject[] = quiz.map((q) => ({
        ...q,
        answerStatus: "none",
      }));
      setCurrentInput(0);
      setQuiz(getRandomValues(newQuizInput));
    }
  }

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.quizContainer}>
      <div>{address}</div>
      <div>
        {quiz.map((q) => {
          return !q.selected ? (
            q.block + " "
          ) : (
            <Input
              key={q.originalIndex}
              index={q.originalIndex}
              block={q.block}
              answerStatus={q.answerStatus}
              onQuizAnswer={updateQuiz}
              forwardedRef={
                quizInputs[currentInput] &&
                quizInputs[currentInput].originalIndex === q.originalIndex
                  ? inputRef
                  : null
              }
            />
          );
        })}
      </div>
    </div>
  );
}
