import Quiz from "./components/Quiz";
import Reference from "./components/Reference";
import Card from "./components/Card/Card";
import verses from "./data/verses";
import { fetchVerse } from "./services/esvApi";
import { useEffect, useState } from "react";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [passage, setPassage] = useState("");
  const [address, setAddress] = useState("");
  const handleNewVerse = async (e) => {
    e && e.preventDefault();
    setIsLoading(true);
    const { book, address } = verses[Math.floor(Math.random() * verses.length)];
    const { passages, canonical } = await fetchVerse(book, address);
    setPassage(passages);
    setAddress(canonical);
    setIsLoading(false);
  };

  // Load verse on component mount
  useEffect(() => {
    handleNewVerse();
  }, []);

  return (
    <div>
      <Card
        front={<Reference passage={passage} address={address} />}
        back={<Quiz passage={passage} address={address} />}
        isLoading={isLoading}
      />
      <button onClick={handleNewVerse}>New Verse</button>
    </div>
  );
}

export default App;
