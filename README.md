# BackendFriendsForever

PoC project demonstrating the Backend-for-Frontend (BFF) architecture pattern with server-driven UI.

## Quick Start (Docker)

```bash
docker compose up --build
```

This starts:
- **mock-apis** on `http://localhost:4001` — simulated government department APIs
- **bff-service** on `http://localhost:4000` — orchestration layer that assembles UI payloads

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
```

## Testing Endpoints

```bash
# BFF account home (requires both services running)
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

## Project Structure

```
apps/
  mock-apis/       — Simulated HMRC, DVLA, DWP APIs (port 4001)
  bff-service/     — BFF orchestration layer (port 4000)
packages/
  shared-types/    — Shared TypeScript types (@bff/shared-types)
```
