import Card from "./components/Card/Card";
import { usePassage } from "./context/PassageContext";
function App() {
  const { handleNewVerse } = usePassage();
  return (
    <div className="app-container">
      <div className="app">
        <Card />
        <button onClick={handleNewVerse} className="buttonShadow">
          New Verse
        </button>
      </div>
    </div>
  );
}

export default App;
