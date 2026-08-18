interface HmrcTaxCardProps {
  incomeTax: {
    taxYear: string;
    totalIncome: number;
    taxPaid: number;
    taxOwed: number;
  };
  taxCodes: { employer: string; code: string }[];
  refunds: { amount: number; status: string; date: string }[];
}

export default function HmrcTaxCard({ incomeTax, taxCodes, refunds }: HmrcTaxCardProps) {
  return (
    <div className="govuk-panel govuk-panel--success">
      <h3 className="govuk-heading-l" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="govuk-tag govuk-tag--green">HMRC</span>
        Income Tax
      </h3>

      <div className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Tax Year</dt>
          <dd className="govuk-summary-list__value">{incomeTax.taxYear}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Total Income</dt>
          <dd className="govuk-summary-list__value">£{incomeTax.totalIncome.toLocaleString()}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Tax Paid</dt>
          <dd className="govuk-summary-list__value">£{incomeTax.taxPaid.toLocaleString()}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Tax Owed</dt>
          <dd className="govuk-summary-list__value">£{incomeTax.taxOwed.toLocaleString()}</dd>
        </div>
      </div>

      {taxCodes.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h4 className="govuk-heading-m">Tax Codes</h4>
          {taxCodes.map((tc, i) => (
            <p key={i} className="govuk-body-s">{tc.employer}: <strong>{tc.code}</strong></p>
          ))}
        </div>
      )}

      {refunds.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          <h4 className="govuk-heading-m">Refunds</h4>
          {refunds.map((r, i) => (
            <p key={i} className="govuk-body-s">
              £{r.amount.toFixed(2)} — <span className="govuk-tag govuk-tag--green">{r.status}</span> ({r.date})
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
