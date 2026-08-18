import type { UDPUserProfile } from '@bff/shared-types';

export const personas: Record<string, UDPUserProfile> = {
  'cit-000': {
    citizenId: 'cit-000',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.gov.uk',
    linkedDepartments: [],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-01T09:00:00Z' },
  },
  'cit-001': {
    citizenId: 'cit-001',
    name: 'Jordan Smith',
    email: 'jordan.smith@example.gov.uk',
    linkedDepartments: ['HMRC'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-02T10:30:00Z' },
  },
  'cit-002': {
    citizenId: 'cit-002',
    name: 'Taylor Brown',
    email: 'taylor.brown@example.gov.uk',
    linkedDepartments: ['DVLA'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-03T11:15:00Z' },
  },
  'cit-003': {
    citizenId: 'cit-003',
    name: 'Casey Williams',
    email: 'casey.williams@example.gov.uk',
    linkedDepartments: ['DWP'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-04T08:45:00Z' },
  },
  'cit-004': {
    citizenId: 'cit-004',
    name: 'Riley Jones',
    email: 'riley.jones@example.gov.uk',
    linkedDepartments: ['HMRC', 'DVLA'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-05T14:00:00Z' },
  },
  'cit-005': {
    citizenId: 'cit-005',
    name: 'Morgan Davies',
    email: 'morgan.davies@example.gov.uk',
    linkedDepartments: ['HMRC', 'DWP'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-06T16:20:00Z' },
  },
  'cit-006': {
    citizenId: 'cit-006',
    name: 'Jamie Wilson',
    email: 'jamie.wilson@example.gov.uk',
    linkedDepartments: ['DVLA', 'DWP'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-07T12:00:00Z' },
  },
  'cit-007': {
    citizenId: 'cit-007',
    name: 'Sam Taylor',
    email: 'sam.taylor@example.gov.uk',
    linkedDepartments: ['HMRC', 'DVLA', 'DWP'],
    udpMeta: { identityLevel: 'P250', lastSync: '2025-06-08T09:30:00Z' },
  },
};
