import {useContext, createContext, useEffect, useState} from 'react';
import verses from "../data/verses";
import { getVerse } from "../services/esvApi";

const PassageContext = createContext();

function PassageProvider({children}){
    const [passage, setPassage] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchVerse = () => {
        const { book, address } =
            verses[Math.floor(Math.random() * verses.length)];
          getVerse(book, address).then(({ passages, canonical }) => {
            setPassage(passages[0]);
            setAddress(canonical);
      
            setIsLoading(false);
          });
      }

    const handleNewVerse = async (e) => {
    e.preventDefault();
        fetchVerse();
    };

    useEffect(() => {
        // if(isLoading)
        // {
        fetchVerse();
        // }   
        }, []);

  return (
    <PassageContext.Provider value={{passage, address, isLoading, handleNewVerse}}>
      {children}
    </PassageContext.Provider>
  )
    
}

function usePassage(){
    const context = useContext(PassageContext);

    if(context === undefined) {
        throw new Error('Passage Context was userd outside of PassageProvider');
    }

    return context;
}

export {PassageProvider, usePassage};