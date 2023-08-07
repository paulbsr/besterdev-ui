import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  return (
    <UserContext.Provider value={{ loggedInUserEmail, setLoggedInUserEmail }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
