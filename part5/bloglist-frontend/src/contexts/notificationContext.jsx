import React, { useReducer, useContext, createContext } from 'react';

const SET_NOTIFICATION = 'SET_NOTIFICATIONs';
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

const initialNotificationState = {
  message: null,
  type: 'success',
};

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case CLEAR_NOTIFICATION:
      return initialNotificationState;
    default:
      return state;
  }
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
