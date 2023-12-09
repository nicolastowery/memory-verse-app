import Quiz from "./components/Quiz";
import Reference from "./components/Reference";
import Card from "./components/Card/Card";
import "./index.css";
import { usePassage } from "./context/PassageContext";
function App() {

  // remove this later by creating a button component, or putting button inside card component
  const {handleNewVerse} = usePassage();

  return (
    <div className="app-container">
      <div className="app">
          <Card
            front={<Reference />}
            back={<Quiz />}
          />
          <button onClick={handleNewVerse}>New Verse</button>
      </div>
    </div>
  );
}

export default App;
