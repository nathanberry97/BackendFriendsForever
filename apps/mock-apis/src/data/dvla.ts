export interface DVLAData {
  citizenId: string;
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

export const dvlaData: Record<string, DVLAData> = {
  'cit-002': {
    citizenId: 'cit-002',
    licence: { status: 'Full', number: 'BROWN905184TF9AB', validUntil: '2032-08-14', penaltyPoints: 0 },
    vehicles: [
      { registration: 'AB12 CDE', make: 'Vauxhall Corsa', taxStatus: 'Taxed', taxDue: '2026-01-01', motExpiry: '2025-11-20' },
    ],
  },
  'cit-004': {
    citizenId: 'cit-004',
    licence: { status: 'Full', number: 'JONES840512RJ7XY', validUntil: '2030-05-12', penaltyPoints: 3 },
    vehicles: [
      { registration: 'FG34 HIJ', make: 'Ford Focus', taxStatus: 'Taxed', taxDue: '2025-09-30', motExpiry: '2025-12-05' },
      { registration: 'KL56 MNO', make: 'BMW 3 Series', taxStatus: 'SORN', taxDue: 'N/A', motExpiry: '2024-06-15' },
    ],
  },
  'cit-006': {
    citizenId: 'cit-006',
    licence: { status: 'Full', number: 'WILSO780923JW2PQ', validUntil: '2029-09-23', penaltyPoints: 6 },
    vehicles: [
      { registration: 'PQ78 RST', make: 'Toyota Yaris', taxStatus: 'Taxed', taxDue: '2025-12-01', motExpiry: '2026-03-18' },
    ],
  },
  'cit-007': {
    citizenId: 'cit-007',
    licence: { status: 'Full', number: 'TAYLO900301ST5UV', validUntil: '2034-03-01', penaltyPoints: 0 },
    vehicles: [
      { registration: 'UV90 WXY', make: 'Tesla Model 3', taxStatus: 'Taxed', taxDue: '2026-04-15', motExpiry: '2026-08-22' },
    ],
  },
};
