import { usePassage } from "../context/PassageContext";

function Reference() {
  const { passage, address } = usePassage();
  return (
    <div>
      <div>{address}</div>
      <br />
      <div>{passage.map((p) => p + " ")}</div>
    </div>
  );
}

export default Reference;
