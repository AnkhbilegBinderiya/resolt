export const authCheck = async () => {
  try {
    const response = await fetch('/api/auth/check', { 
      method: 'POST', 
      cache: 'no-store' // Use this option only if necessary
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching authentication status:', error);
    throw error;
  }
}

export default authCheck;
