# Mock APIs

Express server simulating government department APIs for the BFF proof-of-concept.

## Running

```bash
# From repo root
pnpm dev:apis
```

Starts on `http://localhost:4001`.

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/udp/users/:citizenId` | Returns UDP user profile with linked departments |
| `GET /api/hmrc/:citizenId` | Income tax summary, tax codes, refunds |
| `GET /api/dvla/:citizenId` | Driving licence status, penalty points, vehicles |
| `GET /api/dwp/:citizenId` | Universal Credit statement, State Pension forecast |

Department endpoints return 404 if the citizen is not linked to that department.

## Test Personas

| citizenId | Linked Departments |
|-----------|-------------------|
| `cit-000` | None |
| `cit-001` | HMRC |
| `cit-002` | DVLA |
| `cit-003` | DWP |
| `cit-004` | HMRC, DVLA |
| `cit-005` | HMRC, DWP |
| `cit-006` | DVLA, DWP |
| `cit-007` | HMRC, DVLA, DWP |

## Test with curl

```bash
# UDP - get user profile
curl http://localhost:4001/api/udp/users/cit-000
curl http://localhost:4001/api/udp/users/cit-007

# HMRC - tax data (cit-001 is linked, cit-002 is not)
curl http://localhost:4001/api/hmrc/cit-001
curl http://localhost:4001/api/hmrc/cit-002  # 404

# DVLA - licence and vehicle data
curl http://localhost:4001/api/dvla/cit-002
curl http://localhost:4001/api/dvla/cit-004

# DWP - benefits and pension
curl http://localhost:4001/api/dwp/cit-003
curl http://localhost:4001/api/dwp/cit-005

# Fully integrated citizen (all departments)
curl http://localhost:4001/api/hmrc/cit-007
curl http://localhost:4001/api/dvla/cit-007
curl http://localhost:4001/api/dwp/cit-007
```
