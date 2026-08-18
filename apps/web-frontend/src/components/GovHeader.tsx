export default function GovHeader({ name }: { name: string; citizenId: string }) {
  return (
    <header style={{
      background: 'var(--gds-black)',
      color: 'var(--gds-white)',
      padding: '10px 0',
      marginBottom: '20px',
    }}>
      <div className="govuk-width-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="36" height="32" viewBox="0 0 132 97" fill="white">
            <path d="M66 0C29.5 0 0 21.7 0 48.5S29.5 97 66 97s66-21.7 66-48.5S102.5 0 66 0zm0 88c-30.9 0-56-17.9-56-39.5S35.1 9 66 9s56 17.9 56 39.5S96.9 88 66 88z"/>
          </svg>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>GOV.UK</span>
        </div>
        <span style={{ fontSize: '1rem' }}>Welcome, {name}</span>
      </div>
    </header>
  );
}
