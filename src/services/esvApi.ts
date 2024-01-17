export interface VerseReturn {
  canonical: string;
  passages: [string[]];
}

// type IncompatableString = "" | "\n\n" | "\n";

const getDefaultVerseReturn = (): VerseReturn => {
  return {
    canonical: "John 3:30",
    passages: [["He", "must", "increase,", "but", "I", "must", 'decrease."']],
  };
};

export const getVerse = async (
  book: string,
  address: string
): Promise<VerseReturn> => {
  try {
    const res = await fetch(
      `https://esv-api.vercel.app/fetchVerse/${book}${address}`
    );
    const data = await res.json();
    const { canonical, passages } = data;
    data.passages[0] = data.passages[0].split(/[ —]/);
    data.passages[0] = data.passages[0].filter(
      (p: string) => p !== "" && p !== "\n\n"
    );
    console.log(data.passages[0]);
    return { canonical, passages };
  } catch (error) {
    return getDefaultVerseReturn();
  }
};
