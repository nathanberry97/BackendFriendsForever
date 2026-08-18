interface PayloadDrawerProps {
  payload: unknown;
  isOpen: boolean;
  onToggle: () => void;
}

export default function PayloadDrawer({ payload, isOpen, onToggle }: PayloadDrawerProps) {
  return (
    <>
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          right: isOpen ? '420px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--gds-black)',
          color: 'var(--gds-white)',
          border: 'none',
          padding: '12px 8px',
          cursor: 'pointer',
          writingMode: 'vertical-rl',
          fontSize: '0.8rem',
          fontWeight: 700,
          borderRadius: '4px 0 0 4px',
          zIndex: 200,
          transition: 'right 0.3s ease',
        }}
      >
        {isOpen ? 'Close' : 'BFF Payload'}
      </button>

      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? '0' : '-420px',
        width: '420px',
        height: '100vh',
        background: '#1e1e1e',
        color: '#d4d4d4',
        overflowY: 'auto',
        padding: '20px',
        boxShadow: isOpen ? '-4px 0 20px rgba(0,0,0,0.3)' : 'none',
        transition: 'right 0.3s ease',
        zIndex: 199,
      }}>
        <h3 style={{ color: 'var(--gds-yellow)', marginBottom: '15px', fontSize: '1rem' }}>
          Raw BFF Response
        </h3>
        <pre style={{
          fontSize: '0.75rem',
          lineHeight: '1.4',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'Menlo, Monaco, Consolas, monospace',
        }}>
          {JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </>
  );
}
