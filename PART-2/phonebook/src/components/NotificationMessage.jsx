
const NotificationMessage = ({ message, type }) => {
  if (!message) return null;

  const notificationStyle = {
    padding: '10px',
    maxWidth: '200px',
    textAlign: 'center',
    margin: '10px 0',
    border: type === 'error' ? '3px solid red' : '3px solid green',
    borderRadius: '5px',
    fontSize: '14px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#fdd' : '#dfd',
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default NotificationMessage;
