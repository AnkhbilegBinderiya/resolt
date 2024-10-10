export const fetchBookData = async (league, date, option) => {

    //http://localhost:6969/books?league=NBA&date=2024-10-10&option=ALL
    try {
      const response = await fetch(`/api/book?league=${league}&date=${date}&option=${option}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return undefined
    } catch (error) {
      console.error('Error fetching profile:', error);
      return undefined
    }
}

export default fetchBookData;