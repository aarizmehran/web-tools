import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
        {notifications.map(notification => (
          <div
            key={notification.id}
            className="glass-card animate-fade-in"
            style={{
              padding: '16px 24px',
              marginBottom: '12px',
              minWidth: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: notification.type === 'success' ? 'rgba(74, 222, 128, 0.2)' :
                         notification.type === 'error' ? 'rgba(239, 68, 68, 0.2)' :
                         notification.type === 'warning' ? 'rgba(251, 191, 36, 0.2)' :
                         'var(--glass-bg)'
            }}
          >
            <span>{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', marginLeft: '12px' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
