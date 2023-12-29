export const isAuthTokenAvailable = () => {
    const authToken = localStorage.getItem('auth-token');
    return authToken || null; // Returns the authToken if available, otherwise null
  };