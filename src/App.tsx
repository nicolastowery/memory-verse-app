import Card from "./components/Card/Card";
import { usePassage } from "./context/PassageContext";
function App() {
  const { handleNewVerse, isLoading } = usePassage();
  return (
    <div className="app-container">
      <div className="app">
        <Card />
        <button
          onClick={handleNewVerse}
          disabled={isLoading}
          className="buttonShadow"
        >
          New Verse
        </button>
      </div>
    </div>
  );
}

export default App;
