import { createContext, useState, useContext } from "react";

const IsLoginContext = createContext();

export const useIsLogin = () => useContext(IsLoginContext);

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <IsLoginContext.Provider value={[isLogin, setIsLogin]}>
      {children}
    </IsLoginContext.Provider>
  );
};
