import { useRef } from "react";
const regex = /[a-zA-Z0-9]+(?![^[]*])\b/g;
function Quiz({ passage, address }) {
  const words = passage.match(regex);
  const segments = passage.trim().split(/—| /);
  // const wordIndecies = useRef([]);
  const currentArray = [];
  if (words) {
    for (let i = 0; i < 3; i++) {
      let randomWordIndex;
      let containsWordIndex = false;
      randomWordIndex = Math.floor(Math.random() * words.length);
      currentArray.length > 0 &&
        currentArray.forEach((word) => {
          if (word.index === randomWordIndex) {
            containsWordIndex = true;
          }
        });
      if (!containsWordIndex) {
        const randomWord = {
          index: randomWordIndex,
          text: words[randomWordIndex],
        };
        currentArray.push(randomWord);
      }
    }
    console.log(currentArray);
  }
  return (
    <div>
      quiz
      <div>{address}</div>
      <br />
      <div>
        {currentArray.map((word) => {
          return <span>{word.text} </span>;
        })}
      </div>
    </div>
  );
}

export default Quiz;
