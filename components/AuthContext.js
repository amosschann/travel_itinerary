import { createContext, useContext, useEffect, useState } from 'react';
import { getAccessToken } from '../helpers/AccessTokenHelper';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    //fetch the access token when the component mounts
    getAccessToken()
      .then((accessToken) => {
        if(accessToken !== null) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      })
      .catch((error) => {
        //handle any errors if needed
        console.error('Error fetching access token:', error);
      });
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