import { usePassage } from "../context/PassageContext";

function Reference() {
  const {passage, address} = usePassage();
  return (
    <div>
      <div>{address}</div>
      <br />
      <div>{passage}</div>
    </div>
  );
}

export default Reference;
