import { useNotification } from '../contexts/notificationContext';

const NotificationMessage = () => {
  const { state: notificationState  } = useNotification();

  if (!notificationState || !notificationState.message) {
    return null;
  }

  const { type, message } = notificationState;

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={notificationStyle}>
      {notificationState.message}
    </div>
  );
};

export default NotificationMessage;
