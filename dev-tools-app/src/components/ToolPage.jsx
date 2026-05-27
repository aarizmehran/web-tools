import { useParams, Link } from 'react-router-dom';
import { tools } from '../tools/toolList';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Tool Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          The tool you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'var(--primary-gradient)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          marginBottom: '24px',
          fontSize: '14px'
        }}
      >
        ← Back to Dashboard
      </Link>

      <div className="glass-card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'var(--primary-gradient)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={32} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>{tool.name}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{tool.description}</p>
          </div>
        </div>

        <div style={{
          padding: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)'
        }}>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
            Tool functionality coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
