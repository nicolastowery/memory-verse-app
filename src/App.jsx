import Quiz from "./components/Quiz";
import Reference from "./components/Reference";
import Card from "./components/Card/Card";
import verses from "./data/verses";
import { fetchVerse } from "./services/esvApi";
import { useState } from "react";
function App() {
  const [verse, setVerse] = useState();
  const handleClick = async (e) => {
    e.preventDefault();
    const { book, address } = verses[Math.floor(Math.random() * verses.length)];
    const { passages } = await fetchVerse(book, address);
    setVerse(passages);
  };

  return (
    <div>
      <Card front={<Reference verse={verse} />} back={<Quiz verse={verse} />} />
      <button onClick={handleClick}>New Verse</button>
      <button>Flip Card</button>
    </div>
  );
}

export default App;
