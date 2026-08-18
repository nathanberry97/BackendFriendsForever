interface DwpBenefitsCardProps {
  universalCredit: {
    status: string;
    monthlyAmount: number;
    nextPaymentDate: string;
    breakdown: { element: string; amount: number }[];
  } | null;
  statePension: {
    forecastWeekly: number;
    retirementAge: number;
    qualifyingYears: number;
  };
}

export default function DwpBenefitsCard({ universalCredit, statePension }: DwpBenefitsCardProps) {
  return (
    <div className="govuk-panel" style={{ borderLeft: '5px solid var(--gds-purple)' }}>
      <h3 className="govuk-heading-l" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="govuk-tag govuk-tag--purple">DWP</span>
        Benefits &amp; Pension
      </h3>

      {universalCredit && (
        <div style={{ marginBottom: '20px' }}>
          <h4 className="govuk-heading-m">Universal Credit</h4>
          <div className="govuk-summary-list">
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Status</dt>
              <dd className="govuk-summary-list__value">
                <span className="govuk-tag govuk-tag--green">{universalCredit.status}</span>
              </dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Monthly Amount</dt>
              <dd className="govuk-summary-list__value">£{universalCredit.monthlyAmount.toFixed(2)}</dd>
            </div>
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key">Next Payment</dt>
              <dd className="govuk-summary-list__value">{universalCredit.nextPaymentDate}</dd>
            </div>
          </div>
          {universalCredit.breakdown.length > 0 && (
            <div style={{ marginTop: '10px', background: 'var(--gds-light-grey)', padding: '12px', borderRadius: '2px' }}>
              <p className="govuk-body-s" style={{ fontWeight: 700, marginBottom: '5px' }}>Breakdown:</p>
              {universalCredit.breakdown.map((b, i) => (
                <p key={i} className="govuk-body-s" style={{ marginBottom: '2px' }}>
                  {b.element}: £{b.amount.toFixed(2)}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <h4 className="govuk-heading-m">State Pension Forecast</h4>
      <div className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Weekly Forecast</dt>
          <dd className="govuk-summary-list__value">£{statePension.forecastWeekly.toFixed(2)}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Retirement Age</dt>
          <dd className="govuk-summary-list__value">{statePension.retirementAge}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Qualifying Years</dt>
          <dd className="govuk-summary-list__value">{statePension.qualifyingYears}</dd>
        </div>
      </div>
    </div>
  );
}
