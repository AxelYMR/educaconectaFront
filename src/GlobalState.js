import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [globalState, setGlobalState] = useState({
    nombre: '',
    apellido: '',
    contrasena: '',
    correo: '',
    matricula: ''
  });

  const updateGlobalState = (newState) => {
    setGlobalState((prevState) => ({
      ...prevState,
      ...newState
    }));
  };

  return (
    <GlobalContext.Provider value={{ userData, setUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};