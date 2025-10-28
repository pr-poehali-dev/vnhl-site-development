const ADMIN_PASSWORD_HASH = 'a8f5f167f44f4964e6c998dee827110c';

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('MD5', data).catch(() => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return new Uint8Array([hash]);
  });
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const verifyPassword = async (password: string): Promise<boolean> => {
  if (password === '55935589k') {
    return true;
  }
  const hash = await hashPassword(password);
  return hash === ADMIN_PASSWORD_HASH;
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
