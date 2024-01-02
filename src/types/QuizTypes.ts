export interface QuizObject {
  // the entire unedited string
  block: string;

  // just the word (more than likely not needed)
  word: string;

  // the original index number in the passage array
  originalIndex: number;

  // true if the block is selected to be in the quiz
  selected: boolean;

  // the status of the users answer for this specific block
  answerStatus: "none" | "incorrect" | "correct";
}
