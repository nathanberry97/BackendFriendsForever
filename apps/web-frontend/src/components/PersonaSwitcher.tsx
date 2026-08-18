const PERSONAS = [
  { id: 'cit-000', label: 'No links', departments: [] },
  { id: 'cit-001', label: 'HMRC', departments: ['HMRC'] },
  { id: 'cit-002', label: 'DVLA', departments: ['DVLA'] },
  { id: 'cit-003', label: 'DWP', departments: ['DWP'] },
  { id: 'cit-004', label: 'HMRC+DVLA', departments: ['HMRC', 'DVLA'] },
  { id: 'cit-005', label: 'HMRC+DWP', departments: ['HMRC', 'DWP'] },
  { id: 'cit-006', label: 'DVLA+DWP', departments: ['DVLA', 'DWP'] },
  { id: 'cit-007', label: 'All', departments: ['HMRC', 'DVLA', 'DWP'] },
];

interface PersonaSwitcherProps {
  activeCitizenId: string;
  onSwitch: (citizenId: string) => void;
}

export default function PersonaSwitcher({ activeCitizenId, onSwitch }: PersonaSwitcherProps) {
  return (
    <div style={{
      background: 'var(--gds-white)',
      borderBottom: '2px solid var(--gds-mid-grey)',
      padding: '10px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div className="govuk-width-container">
        <p className="govuk-body-s" style={{ marginBottom: '8px', fontWeight: 700 }}>
          Demo: Switch Persona
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {PERSONAS.map(p => (
            <button
              key={p.id}
              onClick={() => onSwitch(p.id)}
              style={{
                padding: '6px 12px',
                border: activeCitizenId === p.id ? '2px solid var(--gds-black)' : '1px solid var(--gds-mid-grey)',
                borderRadius: '3px',
                background: activeCitizenId === p.id ? 'var(--gds-yellow)' : 'var(--gds-white)',
                fontWeight: activeCitizenId === p.id ? 700 : 400,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'block' }}>{p.id}</span>
              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gds-dark-grey)' }}>
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
