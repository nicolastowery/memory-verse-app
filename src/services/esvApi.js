export const fetchVerse = async (book, address) => {
  try {
    const res = await fetch(
      `http://localhost:3000/fetchVerse/${book}${address}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    // throw Error(error);
    return {canonical: 'John 3:30',
  passages: [
    '[30] He must increase, but I must decrease."'
  ]}
  }
};
