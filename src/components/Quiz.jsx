import { useState, useEffect } from "react";
import Input from "./Input";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;
function Quiz({ passage, address, isLoading, setIsLoading }) {
  const [quiz, setQuiz] = useState([]);
  const words = passage.match(regex);
  const segments = passage.trim().split(/—| /);

  const getRandomWords = () => {
    if (words) {
      for (let i = 0; i < 3; i++) {
        // console.log("loop", i);
        let randomWordIndex;
        let containsWordIndex = false;
        randomWordIndex = Math.floor(Math.random() * words.length);
        quiz.length > 0 &&
          quiz.forEach((word) => {
            if (word.index === randomWordIndex) {
              containsWordIndex = true;
              console.log(containsWordIndex);
            }
          });
        if (!containsWordIndex) {
          const randomWord = {
            index: randomWordIndex,
            text: words[randomWordIndex],
          };
          setQuiz((prevQuiz) => [...prevQuiz, randomWord]);
        }
      }
    }
  };

  useEffect(() => {
    getRandomWords();
  }, [passage]);

  useEffect(() => {
    isLoading && setQuiz([]);
  }, [isLoading]);

  return (
    <div>
      <div>{address}</div>
      <br />
      <div>
        {segments.map((seg, i) => {
          const match = quiz.find((q) => i === q.index);
          // console.log(isMatch);
          return match ? (
            <Input key={i} answer={match} />
          ) : (
            <span key={i}>{seg + " "}</span>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;
