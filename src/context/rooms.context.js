import { off, onValue, ref } from 'firebase/database';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = ref(database, 'rooms');

    onValue(roomListRef, snap => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      off(roomListRef);
    };
  }, []);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
