# BFF Service

Express orchestration layer that fetches from mock department APIs in parallel and assembles a server-driven UI payload for the frontend.

## Running

```bash
# From repo root (requires mock-apis running on port 4001)
pnpm dev:apis &
pnpm dev:bff
```

Starts on `http://localhost:4000`.

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/page/account-home?citizenId=:id` | Returns `BFFLayoutResponse` with dynamically assembled UI components |

## Server-Driven UI Logic

The BFF builds a `components[]` array per citizen:

1. Always includes `GOV_HEADER`
2. For each unlinked department → `LINK_PROMPT_BANNER`
3. For each linked department → fetches data in parallel, returns the corresponding card:
   - HMRC → `HMRC_TAX_CARD`
   - DVLA → `DVLA_VEHICLE_CARD`
   - DWP → `DWP_BENEFITS_CARD`

## Test with curl

```bash
# No departments linked (3 link banners)
curl "http://localhost:4000/api/page/account-home?citizenId=cit-000"

# HMRC only (1 card + 2 banners)
curl "http://localhost:4000/api/page/account-home?citizenId=cit-001"

# DVLA only
curl "http://localhost:4000/api/page/account-home?citizenId=cit-002"

# DWP only
curl "http://localhost:4000/api/page/account-home?citizenId=cit-003"

# HMRC + DVLA
curl "http://localhost:4000/api/page/account-home?citizenId=cit-004"

# HMRC + DWP
curl "http://localhost:4000/api/page/account-home?citizenId=cit-005"

# DVLA + DWP
curl "http://localhost:4000/api/page/account-home?citizenId=cit-006"

# All departments linked (3 cards, no banners)
curl "http://localhost:4000/api/page/account-home?citizenId=cit-007"

# Missing citizenId (400 error)
curl "http://localhost:4000/api/page/account-home"

# Unknown citizen (404 error)
curl "http://localhost:4000/api/page/account-home?citizenId=cit-999"
```
