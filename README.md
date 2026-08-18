# BackendFriendsForever

PoC project demonstrating the Backend-for-Frontend (BFF) architecture pattern with server-driven UI, styled after GOV.UK.

## Quick Start (Docker)

```bash
docker compose up --build
```

This starts:
- **web-frontend** on `http://localhost:3000` — React app with persona switcher
- **bff-service** on `http://localhost:4000` — orchestration layer that assembles UI payloads
- **mock-apis** on `http://localhost:4001` — simulated government department APIs

Open `http://localhost:3000` and use the persona toolbar to switch between citizens.

Stop everything cleanly:
```bash
docker compose down
```

## Local Development (without Docker)

```bash
pnpm install

# Run all services in parallel
pnpm dev

# Or run individually
pnpm dev:apis    # mock-apis on port 4001
pnpm dev:bff     # bff-service on port 4000
pnpm dev:web     # web-frontend on port 3000
```

## Testing Endpoints

```bash
# BFF account home (requires mock-apis + bff-service running)
curl "http://localhost:4000/api/page/account-home?citizenId=cit-000"
curl "http://localhost:4000/api/page/account-home?citizenId=cit-007"

# Mock APIs directly
curl http://localhost:4001/api/udp/users/cit-007
curl http://localhost:4001/api/hmrc/cit-007
curl http://localhost:4001/api/dvla/cit-007
curl http://localhost:4001/api/dwp/cit-007
```

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  web-frontend   │────▶│   bff-service    │────▶│    mock-apis    │
│  (React/Vite)   │     │  (Express BFF)   │     │   (Express)     │
│  port 3000      │     │  port 4000       │     │   port 4001     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

The frontend is a "dumb" renderer — it calls the BFF, which fetches user data from mock APIs in parallel, then assembles a `components[]` array (server-driven UI). The frontend dynamically renders whatever the BFF tells it to via a `<ComponentRenderer />`.

## Test Personas

| citizenId | Linked Departments | UI Result |
|-----------|-------------------|-----------|
| `cit-000` | None | 3 link banners |
| `cit-001` | HMRC | Tax card + 2 banners |
| `cit-002` | DVLA | Vehicle card + 2 banners |
| `cit-003` | DWP | Benefits card + 2 banners |
| `cit-004` | HMRC, DVLA | 2 cards + 1 banner |
| `cit-005` | HMRC, DWP | 2 cards + 1 banner |
| `cit-006` | DVLA, DWP | 2 cards + 1 banner |
| `cit-007` | HMRC, DVLA, DWP | 3 cards, no banners |

## Project Structure

```
apps/
  mock-apis/       — Simulated HMRC, DVLA, DWP APIs (port 4001)
  bff-service/     — BFF orchestration layer (port 4000)
  web-frontend/    — React frontend with GDS styling (port 3000)
packages/
  shared-types/    — Shared TypeScript types (@bff/shared-types)
```
