import Cookies from 'js-cookie';

export const fetchUserId = async () => {
  
  const token = Cookies.get('token');

  console.log("Fetch check: " + token);

  try {
    const response = await fetch('http://localhost:6969/api/user-id', {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}` // Correctly format the Authorization header
      }
    });

    if (!response.ok) {
      window.location.href = `/auth/login`;
      console.log("Faile")
      return null; // Return null in case of redirect
    }else{
      console.log("Good")
    }

    const data = await response.json();
    return data.id; // Return the user ID from the response data
  } catch (error) {
    console.error('Error fetching user ID', error);
    return null;
  }
};

export default fetchUserId;