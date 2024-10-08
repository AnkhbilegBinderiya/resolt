export const authCheck = async () => {
  try {
    const response = await fetch('/api/auth/check', { 
      method: 'POST', 
      cache: 'no-store'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    return undefined;
  } catch (error) {
    console.error('Error fetching authentication status:', error);
    throw error;
  }
}

export default authCheck;
