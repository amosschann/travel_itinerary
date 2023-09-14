import { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken, fetchValidTokenCheck } from '../helpers/AccessTokenHelper';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const accessToken = await getAccessToken();
  
        if (accessToken !== null) {
          const result = await fetchValidTokenCheck(accessToken);
  
          if (result === true) {
            // console.log('Token valid');
            setIsSignedIn(true);
          } else {
            // console.log('Token invalid');
            setIsSignedIn(false);
          }
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error fetching or checking access token:', error);
      }
    };
  
    checkToken();
  }, []);
  


  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };
  

  const value = {
    isSignedIn,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}