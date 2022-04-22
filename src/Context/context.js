import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'



const UserContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = React.useState('loading');

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
      else {
        setUser(null)
      }
    })
  }, [])


  return (<UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider >)
}

export { UserContext };
export default ContextProvider;