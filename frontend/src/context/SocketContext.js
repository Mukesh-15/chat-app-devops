import React, { createContext, useMemo, useState } from 'react';
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
  React.useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io.connect("http://localhost:5500"), []) ;
  const [roomId,setRoomId] = useState(null);

  const getRoomId = () => {
    return roomId;
  }
  return (
    <SocketContext.Provider value={{ socket , setRoomId, getRoomId}}>
      {children}
    </SocketContext.Provider>
  )
}