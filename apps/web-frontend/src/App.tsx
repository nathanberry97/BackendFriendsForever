import { useState, useEffect } from 'react';
import type { BFFLayoutResponse } from '@bff/shared-types';
import PersonaSwitcher from './components/PersonaSwitcher.js';
import ComponentRenderer from './components/ComponentRenderer.js';
import PayloadDrawer from './components/PayloadDrawer.js';

export default function App() {
  const [citizenId, setCitizenId] = useState('cit-000');
  const [response, setResponse] = useState<BFFLayoutResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/page/account-home?citizenId=${citizenId}`)
      .then(res => res.json())
      .then(data => setResponse(data))
      .finally(() => setLoading(false));
  }, [citizenId]);

  return (
    <div>
      <PersonaSwitcher activeCitizenId={citizenId} onSwitch={setCitizenId} />

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper">
          {loading && <p className="govuk-body">Loading...</p>}
          {!loading && response && (
            <ComponentRenderer components={response.components} />
          )}
        </main>
      </div>

      <PayloadDrawer
        payload={response}
        isOpen={drawerOpen}
        onToggle={() => setDrawerOpen(!drawerOpen)}
      />
    </div>
  );
}
