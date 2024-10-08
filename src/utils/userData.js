export const fetchUserData = async (name) => {
    try {
      const response = await fetch(`/api/user/data/name/${name}`, {
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

export default fetchUserData;