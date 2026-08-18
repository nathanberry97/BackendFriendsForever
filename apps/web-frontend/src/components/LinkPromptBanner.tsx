export default function LinkPromptBanner({ department, message }: { department: string; message: string }) {
  return (
    <div className="govuk-panel govuk-panel--info">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gds-blue)">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <div>
          <h3 className="govuk-heading-m" style={{ marginBottom: '5px' }}>{department}</h3>
          <p className="govuk-body" style={{ marginBottom: 0 }}>{message}</p>
        </div>
      </div>
    </div>
  );
}
