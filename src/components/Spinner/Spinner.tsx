import styles from "./Spinner.module.css";
import { CgSpinnerTwo } from "react-icons/cg";
export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <CgSpinnerTwo className={styles.spinner} />
    </div>
  );
}
