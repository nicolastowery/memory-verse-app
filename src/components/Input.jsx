import { useState } from "react";

function Input({ answer, segment, index, updateQuiz }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const fragments = splitSegment(segment);
  function splitSegment(input) {
    const firstIndex = input.search(/\W/);

    // found non-alphanumeric char
    if (firstIndex !== -1) {
      const firstPunctuation = input[firstIndex];
      const secondIndex = input.slice(firstIndex + 1).search(/\W/);
      if (secondIndex !== -1) {
        // const secondPunctuation = input.slice(secondIndex);
        const secondPunctuation = input[firstIndex + 1 + secondIndex];
        return [
          { punctuation: firstPunctuation, index: firstIndex },
          { punctuation: secondPunctuation, index: secondIndex },
        ];
      }

      return [{ punctuation: firstPunctuation, index: firstIndex }];
    } else {
      // no non-alphanumeric char found
      return [input];
    }
  }

  const handleBlur = (e) => {
    if (e.target.value !== "") {
      setAttempted(true);
    } else {
      setAttempted(false);
    }
    if (e.target.value.toLowerCase() === answer.text.toLowerCase()) {
      setIsCorrect(true);
      updateQuiz(index, 'correct')
    } else {
      setIsCorrect(false);
      updateQuiz(index, 'incorrect')
    }
  };
  return (
    <>
      {fragments[0].index === 0 && fragments[0].punctuation}
      <input
        type="text"
        onBlur={handleBlur}
        className={
          (isCorrect && attempted && "input--correct") ||
          (!isCorrect && attempted && "input--incorrect") ||
          ""
        }
      />
      {(fragments[0].index !== 0 && fragments[0].punctuation) ||
        fragments[1]?.punctuation}{" "}
    </>
  );
}

export default Input;
