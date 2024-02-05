import { useState } from "react";
import { usePassage } from "../../context/PassageContext";
import styles from "./Card.module.css";
import Reference from "../Reference";
import Quiz from "../Quiz/Quiz";

export default function Card() {
  const { isLoading } = usePassage();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <>
      <div
        className={
          styles["flip-card"] + " " + (isFlipped ? styles["flipped"] : "")
        }
      >
        <div className={styles["flip-card-inner"]}>
          <div className={styles["flip-card-front"]}>{<Reference />}</div>
          <div className={styles["flip-card-back"]}>
            {<Quiz isFlipped={isFlipped} />}
          </div>
        </div>
      </div>
      <button
        onClick={handleCardFlip}
        disabled={isLoading}
        className="buttonShadow"
      >
        {isFlipped ? "Review" : "Quiz me!"}
      </button>
    </>
  );
}
