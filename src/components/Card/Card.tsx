import { ReactNode, useState } from "react";
import styles from "./Card.module.css";
import { usePassage } from "../../context/PassageContext";

interface CardProps {
  front: ReactNode;
  back: ReactNode;
}

export default function Card({ front, back }: CardProps) {
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
          <div className={styles["flip-card-front"]}>{front}</div>
          <div className={styles["flip-card-back"]}>{back}</div>
        </div>
      </div>
      <button onClick={handleCardFlip} disabled={isLoading}>
        {isFlipped ? "Review" : "Quiz me!"}
      </button>
    </>
  );
}
