export const authLogin = async (email, password) => {

    const payload = {email, password };

    try {
      const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        
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
  
  export default authLogin;
  