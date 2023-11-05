import Quiz from "./components/Quiz";
import Reference from "./components/Reference";
import Card from "./components/Card/Card";
import verses from "./data/verses";
import { fetchVerse } from "./services/esvApi";
import { useEffect, useState } from "react";
import "./index.css";
function App() {
  const [passage, setPassage] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getVerse = () => {
    
    const { book, address } =
        verses[Math.floor(Math.random() * verses.length)];
      fetchVerse(book, address).then(({ passages, canonical }) => {
        setPassage(passages[0]);
        setAddress(canonical);
  
        setIsLoading(false);
      });
  }

  const handleNewVerse = async (e) => {
    e && e.preventDefault();
    getVerse();
    // setIsLoading(true);
  };

  useEffect(() => {
    if(isLoading)
    {
    getVerse();
  }   
  }, [isLoading]); // Only fetch verse when isLoading changes


  return (
    <div className="app-container">
      <div className="app">
        <Card
          front={<Reference passage={passage} address={address} />}
          back={<Quiz passage={passage} address={address}  isLoading={isLoading} setIsLoading={setIsLoading}/>}
          isLoading={isLoading}
        />
        <button onClick={() => setIsLoading(true)}>New Verse</button>
      </div>
    </div>
  );
}

export default App;
