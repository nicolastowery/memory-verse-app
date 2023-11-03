import { createContext, useState } from "react";
import styles from "./Card.module.css";

function Card({ front, back, isLoading }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <>
      <div
        className={
          styles["flip-card"] + " " + (isFlipped ? styles["flipped"] : "")
        }
      >
        <div className={styles["flip-card-inner"]}>
          <div className={styles["flip-card-front"]}>{front}</div>
          <div className={styles["flip-card-back"]}>{back}</div>
        </div>
      </div>
      <button onClick={handleCardFlip} disabled={isLoading}>
        Flip Card
      </button>
    </>
  );
}

export default Card;
