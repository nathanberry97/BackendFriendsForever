// Department Identifiers
export type Department = 'HMRC' | 'DVLA' | 'DWP';

// UDP Profile Response
export interface UDPUserProfile {
  citizenId: string;
  name: string;
  email: string;
  linkedDepartments: Department[];
  udpMeta: {
    identityLevel: string;
    lastSync: string;
  };
}

// UI Component Types for Server-Driven UI
export type UIComponentType =
  | 'GOV_HEADER'
  | 'LINK_PROMPT_BANNER'
  | 'HMRC_TAX_CARD'
  | 'DVLA_VEHICLE_CARD'
  | 'DWP_BENEFITS_CARD';

export interface UIComponent {
  type: UIComponentType;
  props: Record<string, any>;
}

// BFF Final Response Payload to Frontend
export interface BFFLayoutResponse {
  user: {
    citizenId: string;
    name: string;
  };
  components: UIComponent[];
}
