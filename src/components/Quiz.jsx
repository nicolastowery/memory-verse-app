import { useState, useEffect } from "react";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;
function Quiz({ passage, address, isLoading, setIsLoading }) {
  const [quiz, setQuiz] = useState([]);
  const words = passage.match(regex);
  const segments = passage.trim().split(/—| /);
  
    const getRandomWords = () => {

      if (words) {
        for (let i = 0; i < 3; i++) {
          console.log('loop', i)
          let randomWordIndex;
          let containsWordIndex = false;
          randomWordIndex = Math.floor(Math.random() * words.length);
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
              text: words[randomWordIndex],
            };
            console.log('setting quiz')
            setQuiz((prevQuiz) => [...prevQuiz, randomWord])
          }
        }
      }
    }

    useEffect(()=>{

      isLoading && getRandomWords();
    }, [isLoading])

  return (
    <div>
      quiz
      <div>{address}</div>
      <br />
      <div>
        {quiz.map((word) => {
          return <span key={word.index}>{word.text} </span>;
        })}
      </div>
    </div>
  );
}

export default Quiz;
