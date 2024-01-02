export const getVerse = async (book: string, address: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/fetchVerse/${book}${address}`
    );
    if (res.ok) {
      const data = await res.json();
      data.passages[0] = data.passages[0].split(" ");
      return data;
    }
  } catch (error) {
    console.log("error!");
    // throw Error(error);
    return {
      canonical: "John 3:30",
      passages: [["He", "must", "increase,", "but", "I", "must", 'decrease."']],
    };
  }
};
