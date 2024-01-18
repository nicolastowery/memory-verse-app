import Card from "./components/Card/Card";
import Reference from "./components/Reference";
import Quiz from "./components/Quiz/Quiz";
import { usePassage } from "./context/PassageContext";
function App() {
  const { handleNewVerse } = usePassage();
  return (
    <div className="app-container">
      <div className="app">
        <Card front={<Reference />} back={<Quiz />} />
        <button onClick={handleNewVerse} className="buttonShadow">
          New Verse
        </button>
      </div>
    </div>
  );
}

export default App;
