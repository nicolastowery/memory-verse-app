import styled from "styled-components";

interface StyledInputProps {
  status: "correct" | "incorrect" | "none";
  baseWidth: number;
}

export const StyledInput = styled.input<StyledInputProps>`
  font: inherit;
  color: ${(props) =>
    props.status === "correct" ? "black" : "rgba(255, 255, 255, 0.8)"};
  background-color: ${(props) =>
    (props.status === "none" && "rgba(255, 255, 255, 0.08)") ||
    (props.status === "correct" && "rgba(204, 243, 201)") ||
    (props.status === "incorrect" && "rgba(107, 0, 0, 0.6)")};
  padding: 25px 0;
  border: none;
  text-align: center;
  height: 44px;
  caret-shape: block;
  caret-color: rgba(255, 255, 255, 0.8);
  width: ${(props) =>
    (props.baseWidth <= 3 ? props.baseWidth * 27 : props.baseWidth * 22) +
    "px"};

  &:focus {
    border: 1px solid rgba(255, 255, 255, 0.9);
    outline: none;
  }

  @media (max-width: 1080px) {
    width: ${(props) =>
      (props.baseWidth <= 3
        ? (props.baseWidth * 25) / 1.32
        : (props.baseWidth * 30) / 1.81) + "px"};
    height: 35px;
    padding: 0;
  }

  @media (max-width: 750px) {
    width: ${(props) =>
      (props.baseWidth <= 3
        ? (props.baseWidth * 25) / 1.51
        : (props.baseWidth * 30) / 2.24) + "px"};
    height: 30px;
  }
`;
