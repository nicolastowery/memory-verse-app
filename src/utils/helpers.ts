import { QuizObject } from "../types/QuizTypes";
import _ from "lodash";
export const splitSegment = (input: string) => {
  // Use regular expression to match symbols on the left, alphanumeric center, and symbols on the right
  const match = input.match(
    /^([^a-zA-Z0-9]*)([a-zA-Z0-9\s,]+)([^a-zA-Z0-9]*)$/
  );

  const symbolsLeft = match ? match[1] : "";
  const alphanumericCenter = match ? match[2] : "";
  const symbolsRight = match ? match[3] : "";
  return [symbolsLeft, alphanumericCenter, symbolsRight];
};

// Returns an arra
export const getRandomValues = (
  array: QuizObject[],
  // cb: (array: QuizObject[]) => void,
  count: number = 3
) => {
  if (count > array.length) {
    throw new Error("Count should not exceed the length of the array.");
  }

  console.log("array", array);
  const shuffledArray = _.shuffle(
    // only shuffling and extracting values that have not been selected
    // array
    array.filter((value) => !value.selected)
  );

  console.log("shuffledArray", shuffledArray);
  // selecting the first *count* values from the shuffle
  const selectedValues = shuffledArray.slice(0, count);
  console.log("selectedValues", selectedValues);
  // creating a new array where the selected values are marked as selected
  const updatedArray = array.map((value) => {
    if (
      selectedValues.some(
        (selectedValue) => selectedValue.originalIndex === value.originalIndex
      )
    ) {
      value.selected = true;
    }
    return value;
  });
  console.log("updatedArray", updatedArray);
  // cb(updatedArray);
  return updatedArray;
};
