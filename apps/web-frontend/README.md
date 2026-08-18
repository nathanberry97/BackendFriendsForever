# Web Frontend

React app that renders server-driven UI from the BFF service, styled to match GOV.UK Design System patterns.

## Running

```bash
# From repo root (requires bff-service on port 4000)
pnpm dev:web
```

Starts on `http://localhost:3000`. API calls are proxied to the BFF at port 4000.

Or with Docker (runs all services):
```bash
docker compose up --build
```

## Features

### Persona Switcher

Sticky toolbar at the top of the page with buttons for all 8 test personas. Click any persona to re-fetch from the BFF and see the UI update instantly. Each button shows the citizenId and which departments are linked.

### Component Renderer

The app fetches a `BFFLayoutResponse` from `/api/page/account-home?citizenId=...` and dynamically renders the `components[]` array. Each component type maps to a React component:

| BFF Component Type | React Component | Description |
|---|---|---|
| `GOV_HEADER` | `<GovHeader />` | Black GOV.UK header bar with user name |
| `LINK_PROMPT_BANNER` | `<LinkPromptBanner />` | Blue info banner prompting to link a department |
| `HMRC_TAX_CARD` | `<HmrcTaxCard />` | Income tax summary, tax codes, refunds |
| `DVLA_VEHICLE_CARD` | `<DvlaVehicleCard />` | Licence status, penalty points, vehicles |
| `DWP_BENEFITS_CARD` | `<DwpBenefitsCard />` | Universal Credit statement, State Pension forecast |

### Raw Payload Drawer

A slide-in side panel (toggle on right edge of screen) showing the raw JSON response from the BFF. Useful for demonstrating the server-driven UI contract during presentations.

## GDS Styling

Uses GOV.UK Design System colour tokens and layout patterns via plain CSS (no framework). Font is Source Sans 3 (close match to GDS Transport).

Key tokens:
- `--gds-black`: `#0b0c0c`
- `--gds-blue`: `#1d70b8`
- `--gds-green`: `#00703c`
- `--gds-red`: `#d4351c`
- `--gds-yellow`: `#ffdd00`
- `--gds-light-grey`: `#f3f2f1`
