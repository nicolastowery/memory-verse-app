import { usePassage } from "../context/PassageContext";
import Spinner from "./Spinner/Spinner";
function Reference() {
  const { passage, address, isLoading } = usePassage();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div>{address}</div>
      <br />
      <div>{passage.map((p) => p + " ")}</div>
    </div>
  );
}

export default Reference;
