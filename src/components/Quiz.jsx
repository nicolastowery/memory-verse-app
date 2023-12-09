import { useState, useEffect, useRef } from "react";
import Input from "./Input";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;
function Quiz({ passage, address, isLoading, setIsLoading }) {
  const [quiz, setQuiz] = useState([]);
  const wordsRemaining = useRef(passage.match(regex));
  const segments = passage.trim().split(/—| /);
  console.log('words', wordsRemaining)
  console.log('quiz', quiz)


  useEffect(() => {
    // Update the words ref when the passage prop changes
    wordsRemaining.current = passage.match(regex);
  }, [passage, regex]);

  useEffect(() => {
    getRandomWords();
  }, [passage]);

  useEffect(() => {
    isLoading && setQuiz([]);
  }, [isLoading]);
  
  

  
  const getRandomWords = () => {
    if (wordsRemaining?.current?.length > 0) {
      console.log('words.current', wordsRemaining.current)
      for (let i = 0; i < 3; i++) {
        let containsWordIndex = false;
        let randomWordIndex;
        // while (containsWordIndex) {
        //   randomWordIndex = Math.floor(Math.random() * words.length);
          
        //   containsWordIndex = quiz.some((word) => word.index === randomWordIndex)

        // }

        // This line is causing issues because it is not checking if the random index was assigned in a previous loop iteration 
        randomWordIndex = Math.floor(Math.random() * wordsRemaining.current.length);
        quiz.length > 0 &&
          quiz.forEach((word) => {
            if (word.index === randomWordIndex) {
              containsWordIndex = true;
              console.log(containsWordIndex)
            }
          });
        if (!containsWordIndex) {
          const randomWord = {
            index: randomWordIndex,
            text: wordsRemaining.current[randomWordIndex],
            answered: 'none',
          };
          setQuiz((prevQuiz) => [...prevQuiz, randomWord]);
          wordsRemaining.current.splice(randomWordIndex, 1)
          wordsRemaining.current = [...wordsRemaining.current];
        }
      }
    }
  };

  const handleAllWordsAnsweredCorrect = () => {
    if (quiz.length === segments.length) {
      console.log('Congratulations!')
    } else {
      getRandomWords();
    }
  }

  
  if (quiz.length > 0) {
    const allWordsAnsweredCorrect = quiz.every(obj => obj.answered === 'correct');
    allWordsAnsweredCorrect && handleAllWordsAnsweredCorrect();
  }
  const updateQuiz = (index, updatedAnswered) => {
    setQuiz((prevQuiz) => prevQuiz.map((obj) => obj.index === index ? {...obj, answered: updatedAnswered} : obj))
  }

  return (
    <div>
      <div>{address}</div>
      <br />
      <div>
        {segments.map((seg, i) => {
          const match = quiz.find((q) => i === q.index);
          return match ? (
            <Input key={i} index={i} answer={match} segment={seg} updateQuiz={updateQuiz}/>
          ) : (
            <span key={i}>{seg + " "}</span>
          );
        })}
      </div>
    </div>
  );
}

export default Quiz;
