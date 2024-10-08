export const authRegister = async (email, password, username) => {

    const payload = {email, password, username};

    try {
      const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
  
      return undefined;
    } catch (error) {
      console.error('Error fetching login status:', error);
      throw error;
    }
  }
  
  export default authRegister;
  