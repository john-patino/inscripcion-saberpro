// src/Core/context/UserContext.jsx
import { createContext, useContext } from "react";
import useAuth from "../utils/hooks/useAuth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
