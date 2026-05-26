import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, Grid } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { toolCategories, tools, searchTools } from '../tools/toolList';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const filteredTools = searchQuery 
    ? searchTools(searchQuery)
    : activeCategory === 'all' 
      ? tools 
      : tools.filter(t => t.category === activeCategory);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside 
        className={`glass-card animate-fade-in ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: sidebarOpen ? 'var(--sidebar-width)' : '0',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          zIndex: 1000,
          padding: sidebarOpen ? '20px' : '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'var(--primary-gradient)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🔧
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700' }}>DevTools Pro</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>100+ Tools</p>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            color: 'var(--text-secondary)'
          }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-glass"
            style={{ paddingLeft: '40px' }}
          />
        </div>

        {/* Categories */}
        <nav style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {toolCategories.slice(0, 6).map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`btn-secondary ${activeCategory === cat.id ? 'active' : ''}`}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12px',
                    background: activeCategory === cat.id ? 'var(--accent-color)' : 'transparent',
                    border: activeCategory === cat.id ? 'none' : '1px solid var(--glass-border)'
                  }}
                >
                  <Icon size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Tool List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredTools.slice(0, 50).map(tool => {
              const Icon = tool.icon;
              const isActive = location.pathname.slice(1) === tool.id;
              return (
                <Link
                  key={tool.id}
                  to={`/${tool.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: isActive ? 'var(--glass-bg)' : 'transparent',
                    border: isActive ? '1px solid var(--accent-color)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--glass-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--accent-color)' : 'var(--text-secondary)'} />
                  <span style={{ fontSize: '14px' }}>{tool.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: sidebarOpen ? 'var(--sidebar-width)' : '0',
        transition: 'margin-left 0.3s ease',
        padding: '20px',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          padding: '20px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn-secondary"
              style={{ padding: '10px' }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
                {location.pathname === '/' ? 'Dashboard' : tools.find(t => t.id === location.pathname.slice(1))?.name || 'Tool'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {location.pathname === '/' ? `${tools.length} tools available` : tools.find(t => t.id === location.pathname.slice(1))?.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Grid size={18} />
              Dashboard
            </Link>
            <button
              onClick={toggleTheme}
              className="btn-primary"
              style={{ padding: '10px 16px' }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
