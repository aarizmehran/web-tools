import { Link } from 'react-router-dom';
import { toolCategories, tools } from '../tools/toolList';

export default function Dashboard() {
  return (
    <div>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="glass-card animate-fade-in" style={{ padding: '24px' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {tools.length}+
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Total Tools</p>
        </div>
        <div className="glass-card animate-fade-in" style={{ padding: '24px', animationDelay: '0.1s' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {toolCategories.length - 1}
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Categories</p>
        </div>
        <div className="glass-card animate-fade-in" style={{ padding: '24px', animationDelay: '0.2s' }}>
          <div style={{ fontSize: '36px', fontWeight: '700', background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            100%
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Free to Use</p>
        </div>
      </div>

      {/* Categories Grid */}
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Browse by Category</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {toolCategories.slice(1).map((category, index) => {
          const Icon = category.icon;
          const categoryTools = tools.filter(t => t.category === category.id);
          return (
            <Link
              key={category.id}
              to="/"
              className="glass-card animate-fade-in"
              style={{
                padding: '24px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease',
                animationDelay: `${index * 0.05}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'var(--glass-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: 'var(--primary-gradient)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icon size={24} color="white" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{category.name}</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{categoryTools.length} tools</p>
            </Link>
          );
        })}
      </div>

      {/* All Tools Grid */}
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>All Tools</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={`/${tool.id}`}
              className="glass-card animate-fade-in"
              style={{
                padding: '20px',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease',
                animationDelay: `${index * 0.02}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  background: 'var(--primary-gradient)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={22} color="white" />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px' }}>{tool.name}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tool.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
