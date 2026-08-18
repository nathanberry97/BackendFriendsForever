export interface DWPData {
  citizenId: string;
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

export const dwpData: Record<string, DWPData> = {
  'cit-003': {
    citizenId: 'cit-003',
    universalCredit: {
      status: 'Active',
      monthlyAmount: 892.4,
      nextPaymentDate: '2025-07-14',
      breakdown: [
        { element: 'Standard allowance', amount: 393.45 },
        { element: 'Housing element', amount: 498.95 },
      ],
    },
    statePension: { forecastWeekly: 185.15, retirementAge: 67, qualifyingYears: 12 },
  },
  'cit-005': {
    citizenId: 'cit-005',
    universalCredit: {
      status: 'Active',
      monthlyAmount: 620.0,
      nextPaymentDate: '2025-07-21',
      breakdown: [
        { element: 'Standard allowance', amount: 393.45 },
        { element: 'Childcare element', amount: 226.55 },
      ],
    },
    statePension: { forecastWeekly: 175.2, retirementAge: 67, qualifyingYears: 18 },
  },
  'cit-006': {
    citizenId: 'cit-006',
    universalCredit: null,
    statePension: { forecastWeekly: 203.85, retirementAge: 67, qualifyingYears: 30 },
  },
  'cit-007': {
    citizenId: 'cit-007',
    universalCredit: null,
    statePension: { forecastWeekly: 221.2, retirementAge: 67, qualifyingYears: 35 },
  },
};
