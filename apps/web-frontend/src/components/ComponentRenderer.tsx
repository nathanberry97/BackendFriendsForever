import type { UIComponent } from '@bff/shared-types';
import GovHeader from './GovHeader.js';
import LinkPromptBanner from './LinkPromptBanner.js';
import HmrcTaxCard from './HmrcTaxCard.js';
import DvlaVehicleCard from './DvlaVehicleCard.js';
import DwpBenefitsCard from './DwpBenefitsCard.js';

const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  GOV_HEADER: GovHeader,
  LINK_PROMPT_BANNER: LinkPromptBanner,
  HMRC_TAX_CARD: HmrcTaxCard,
  DVLA_VEHICLE_CARD: DvlaVehicleCard,
  DWP_BENEFITS_CARD: DwpBenefitsCard,
};

interface ComponentRendererProps {
  components: UIComponent[];
}

export default function ComponentRenderer({ components }: ComponentRendererProps) {
  return (
    <>
      {components.map((comp, index) => {
        const Component = COMPONENT_MAP[comp.type];
        if (!Component) return null;
        return <Component key={`${comp.type}-${index}`} {...comp.props} />;
      })}
    </>
  );
}
