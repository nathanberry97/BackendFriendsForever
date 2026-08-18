# BackendFriendsForever (BFF) — Board

## TODO

- [ ] **Dumb React Frontend (`apps/web-frontend`)**
  - [ ] React + Vite setup on port `3000` with Tailwind CSS (GDS colour tokens)
  - [ ] Persona switcher toolbar
  - [ ] `<ComponentRenderer />` dynamic mapper
  - [ ] GDS UI components (`GovHeader`, `VerificationBanner`, `ServiceCards`, `CaseworkerMetrics`)
  - [ ] Collapsible "Raw BFF Payload" drawer for the demo

- [ ] **Friday Demo Prep**
  - [ ] Test single-command launch (`pnpm dev`)
  - [ ] Rehearse 3-minute pitch script

## IN PROGRESS

## DONE
- [X] Project scope and idea approved
- [X] Architecture design (pnpm workspace + Express BFF + React)
- [X] Named project: **BackendFriendsForever**
- [X] **Repository Setup**
  - [X] Initialize `pnpm-workspace.yaml` and root `package.json`
  - [X] Configure `tsconfig.base.json`
  - [X] Create `@bff/shared-types` package with GOV.UK component schemas
- [X] **Mock APIs (`apps/mock-apis`)**
  - [X] Express setup on port `4001`
    - [X] `/api/udp/users/:citizenId` endpoint (8 personas covering all service linkage permutations):
        - [X] Persona 0 (`cit-000`): Linked to None (3 Link Banners: HMRC, DVLA, DWP)
        - [X] Persona A (`cit-001`): Linked to HMRC only
        - [X] Persona B (`cit-002`): Linked to DVLA only
        - [X] Persona C (`cit-003`): Linked to DWP only
        - [X] Persona D (`cit-004`): Linked to HMRC & DVLA
        - [X] Persona E (`cit-005`): Linked to HMRC & DWP
        - [X] Persona F (`cit-006`): Linked to DVLA & DWP
        - [X] Persona G (`cit-007`): Linked to HMRC, DVLA & DWP (Fully integrated)
    - [X] Department-specific domain endpoints using unified `id`:
        - [X] `/api/hmrc/:citizenId` | (Income Tax summary, tax codes, refunds)
        - [X] `/api/dvla/:citizenId` | (Driving licence status, penalty points, vehicle tax & MOT)
        - [X] `/api/dwp/:citizenId`  | (Universal Credit statement, State Pension forecast)
- [X] **BFF Orchestration Layer (`apps/bff-service`)**
  - [X] Express setup on port `4000`
  - [X] `/api/page/account-home` endpoint with parallel data fetching
  - [X] Server-Driven UI logic (dynamically assembling UI schema per persona)

