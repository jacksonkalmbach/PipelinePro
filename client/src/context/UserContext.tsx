import { createContext } from "react";
import socketIOClient from "socket.io-client";

const WS = "http://localhost:5001";

export const UserContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const UserProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <UserContext.Provider value={{ ws }}>{children}</UserContext.Provider>;
};
