import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const setNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ message, setNotification }}>
      {children}
      {message && <div className="notification">{message}</div>}
    </NotificationContext.Provider>
  );
};
