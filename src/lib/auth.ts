export const verifyPassword = async (password: string): Promise<boolean> => {
  try {
    const response = await fetch('https://functions.poehali.dev/e3ba00e7-fe93-4a7c-a328-9c5525c4d27e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('vnhl_admin_auth') === 'true';
};

export const login = () => {
  localStorage.setItem('vnhl_admin_auth', 'true');
};

export const logout = () => {
  localStorage.removeItem('vnhl_admin_auth');
};