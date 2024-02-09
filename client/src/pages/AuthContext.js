// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [logedin, setlogedin] = useState(() => {
    // Check local storage for the authentication status on app load
    const storedLogedin = localStorage.getItem('logedin');
    console.log(storedLogedin)
    return storedLogedin ? JSON.parse(storedLogedin) : false;
  });

  const [username, setusername] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername || ''; // Set the default value accordingly
  });

  const [userMode, setuserMode] = useState(() => {
    // Check local storage for the user mode on app load
    const storedUserMode = localStorage.getItem('userMode');
    return storedUserMode || 'Applicant';
  });
  
  const [currPage, setcurrPage] = useState(() => {
    // Check local storage for the user mode on app load
    const storedUserMode = localStorage.getItem('currPage');
    return storedUserMode || '/';
  });

  useEffect(() => {
    // Update local storage when logedin or userMode changes
    localStorage.setItem('logedin', JSON.stringify(logedin));
    localStorage.setItem('username', username);
    localStorage.setItem('userMode', userMode);
    localStorage.setItem('currPage', currPage);
  }, [logedin, username,userMode,currPage]);

  return (
    <AuthContext.Provider value={{ logedin, setlogedin, username, setusername,userMode, setuserMode, currPage, setcurrPage }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
