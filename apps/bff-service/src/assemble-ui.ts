import type { UDPUserProfile, UIComponent, BFFLayoutResponse, Department } from '@bff/shared-types';

const ALL_DEPARTMENTS: Department[] = ['HMRC', 'DVLA', 'DWP'];

interface DepartmentData {
  hmrc: Record<string, any> | null;
  dvla: Record<string, any> | null;
  dwp: Record<string, any> | null;
}

export function assembleUI(profile: UDPUserProfile, data: DepartmentData): BFFLayoutResponse {
  const components: UIComponent[] = [];

  components.push({
    type: 'GOV_HEADER',
    props: { name: profile.name, citizenId: profile.citizenId },
  });

  for (const dept of ALL_DEPARTMENTS) {
    if (!profile.linkedDepartments.includes(dept)) {
      components.push({
        type: 'LINK_PROMPT_BANNER',
        props: { department: dept, message: `Link your ${dept} account to see your information here.` },
      });
    } else {
      switch (dept) {
        case 'HMRC':
          if (data.hmrc) {
            components.push({ type: 'HMRC_TAX_CARD', props: data.hmrc });
          }
          break;
        case 'DVLA':
          if (data.dvla) {
            components.push({ type: 'DVLA_VEHICLE_CARD', props: data.dvla });
          }
          break;
        case 'DWP':
          if (data.dwp) {
            components.push({ type: 'DWP_BENEFITS_CARD', props: data.dwp });
          }
          break;
      }
    }
  }

  return {
    user: { citizenId: profile.citizenId, name: profile.name },
    components,
  };
}
