import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import verses from "../data/verses";
import { getVerse } from "../services/esvApi";

interface PassageContextType {
  passage: string[];
  address: string;
  isLoading: boolean;
  handleNewVerse: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const PassageContext = createContext<PassageContextType | undefined>(undefined);

interface PassageProviderProps {
  children: ReactNode;
}

function PassageProvider({ children }: PassageProviderProps) {
  const [passage, setPassage] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchVerse = () => {
    const { book, address } = verses[Math.floor(Math.random() * verses.length)];
    getVerse(book, address).then(({ passages, canonical }) => {
      setPassage(passages[0]);
      setAddress(canonical);

      setIsLoading(false);
    });
  };

  const handleNewVerse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const verse = await fetchVerse();
    return verse;
  };

  useEffect(() => {
    // if(isLoading)
    // {
    fetchVerse();
    // }
  }, []);

  return (
    <PassageContext.Provider
      value={{ passage, address, isLoading, handleNewVerse }}
    >
      {children}
    </PassageContext.Provider>
  );
}

function usePassage() {
  const context = useContext(PassageContext);

  if (context === undefined) {
    throw new Error("Passage Context was userd outside of PassageProvider");
  }

  return context;
}

export { usePassage, PassageProvider };
