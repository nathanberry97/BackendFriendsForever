interface DvlaVehicleCardProps {
  licence: {
    status: string;
    number: string;
    validUntil: string;
    penaltyPoints: number;
  };
  vehicles: {
    registration: string;
    make: string;
    taxStatus: string;
    taxDue: string;
    motExpiry: string;
  }[];
}

export default function DvlaVehicleCard({ licence, vehicles }: DvlaVehicleCardProps) {
  return (
    <div className="govuk-panel" style={{ borderLeft: '5px solid var(--gds-blue)' }}>
      <h3 className="govuk-heading-l" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="govuk-tag">DVLA</span>
        Driving &amp; Vehicles
      </h3>

      <div className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Licence Status</dt>
          <dd className="govuk-summary-list__value">{licence.status}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Licence Number</dt>
          <dd className="govuk-summary-list__value" style={{ fontFamily: 'monospace' }}>{licence.number}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Valid Until</dt>
          <dd className="govuk-summary-list__value">{licence.validUntil}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Penalty Points</dt>
          <dd className="govuk-summary-list__value">
            {licence.penaltyPoints > 0 ? (
              <span className="govuk-tag govuk-tag--red">{licence.penaltyPoints} points</span>
            ) : (
              <span className="govuk-tag govuk-tag--green">0 points</span>
            )}
          </dd>
        </div>
      </div>

      {vehicles.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4 className="govuk-heading-m">Vehicles</h4>
          {vehicles.map((v, i) => (
            <div key={i} style={{ background: 'var(--gds-light-grey)', padding: '12px', marginBottom: '10px', borderRadius: '2px' }}>
              <p className="govuk-body" style={{ fontWeight: 700, marginBottom: '5px' }}>
                {v.registration} — {v.make}
              </p>
              <p className="govuk-body-s" style={{ marginBottom: 0 }}>
                Tax: <span className="govuk-tag govuk-tag--green">{v.taxStatus}</span>{' '}
                {v.taxDue !== 'N/A' && `(due ${v.taxDue})`} &nbsp;|&nbsp; MOT expires: {v.motExpiry}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
