import { useState } from "react";
function Input({ answer }) {
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempted, setAttempted] = useState(false);
  console.log("answer = ", answer);
  const handleBlur = (e) => {
    if (e.target.value !== "") {
      setAttempted(true);
    } else {
      setAttempted(false);
    }
    if (e.target.value.toLowerCase() === answer.text.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  return (
    <>
      <input
        type="text"
        onBlur={handleBlur}
        className={
          (isCorrect && attempted && "input--correct") ||
          (!isCorrect && attempted && "input--incorrect") ||
          ""
        }
      />{" "}
    </>
  );
}

export default Input;
