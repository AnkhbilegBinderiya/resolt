export const fetchUserRole = async (token) => {
    console.log(token);
    try {
      const response = await fetch('http://localhost:6969/api/user-role', {
        headers: {
          'Authorization': token
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.role;
    } catch (error) {
      console.error('Error fetching user role', error);
      return null;
    }
  };
  
  export default fetchUserRole;