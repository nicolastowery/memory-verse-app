import { createContext, useState } from "react";
import styles from "./Card.module.css";

function Card({ front, back }) {
  return (
    <div className={styles["flip-card"]}>
      <div className={styles["flip-card-inner"]}>
        <div className={styles["flip-card-front"]}>{front}</div>
        <div className={styles["flip-card-back"]}>{back}</div>
      </div>
    </div>
  );
}

export default Card;
