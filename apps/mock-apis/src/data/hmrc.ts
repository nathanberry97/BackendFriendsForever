export interface HMRCData {
  citizenId: string;
  incomeTax: {
    taxYear: string;
    totalIncome: number;
    taxPaid: number;
    taxOwed: number;
  };
  taxCodes: { employer: string; code: string }[];
  refunds: { amount: number; status: string; date: string }[];
}

export const hmrcData: Record<string, HMRCData> = {
  'cit-001': {
    citizenId: 'cit-001',
    incomeTax: { taxYear: '2024-25', totalIncome: 42000, taxPaid: 6200, taxOwed: 0 },
    taxCodes: [{ employer: 'Acme Ltd', code: '1257L' }],
    refunds: [{ amount: 124.5, status: 'paid', date: '2025-03-15' }],
  },
  'cit-004': {
    citizenId: 'cit-004',
    incomeTax: { taxYear: '2024-25', totalIncome: 55000, taxPaid: 9400, taxOwed: 320 },
    taxCodes: [{ employer: 'Gov Digital', code: '1257L' }, { employer: 'Freelance', code: 'BR' }],
    refunds: [],
  },
  'cit-005': {
    citizenId: 'cit-005',
    incomeTax: { taxYear: '2024-25', totalIncome: 28000, taxPaid: 3100, taxOwed: 0 },
    taxCodes: [{ employer: 'Care Corp', code: '1257L' }],
    refunds: [{ amount: 75.0, status: 'processing', date: '2025-05-01' }],
  },
  'cit-007': {
    citizenId: 'cit-007',
    incomeTax: { taxYear: '2024-25', totalIncome: 67000, taxPaid: 13200, taxOwed: 0 },
    taxCodes: [{ employer: 'National Tech', code: '1257L' }],
    refunds: [{ amount: 230.0, status: 'paid', date: '2025-02-28' }],
  },
};
