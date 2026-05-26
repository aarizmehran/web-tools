import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ToolPage from './components/ToolPage';
import { tools } from './tools/toolList';

function AppContent() {
  const location = useLocation();
  const [activeTool, setActiveTool] = useState(null);

  useEffect(() => {
    const toolId = location.pathname.slice(1);
    if (toolId) {
      const tool = tools.find(t => t.id === toolId);
      if (tool) {
        setActiveTool(tool);
      }
    }
  }, [location]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path=":toolId" element={<ToolPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
