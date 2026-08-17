# BackendFriendsForever (BFF) — Board

## TODO

- [ ] **Mock APIs (`apps/mock-apis`)**
  - [ ] Express setup on port `4001`
    - [ ] `/api/udp/users/:citizenId` endpoint (8 personas covering all service linkage permutations):
        - [ ] Persona 0 (`cit-000`): Linked to None (3 Link Banners: HMRC, DVLA, DWP)
        - [ ] Persona A (`cit-001`): Linked to HMRC only
        - [ ] Persona B (`cit-002`): Linked to DVLA only
        - [ ] Persona C (`cit-003`): Linked to DWP only
        - [ ] Persona D (`cit-004`): Linked to HMRC & DVLA
        - [ ] Persona E (`cit-005`): Linked to HMRC & DWP
        - [ ] Persona F (`cit-006`): Linked to DVLA & DWP
        - [ ] Persona G (`cit-007`): Linked to HMRC, DVLA & DWP (Fully integrated)
    - [ ] Department-specific domain endpoints using unified `id`:
        - [ ] `/api/hmrc/:citizenId` | (Income Tax summary, tax codes, refunds)
        - [ ] `/api/dvla/:citizenId` | (Driving licence status, penalty points, vehicle tax & MOT)
        - [ ] `/api/dwp/:citizenId`  | (Universal Credit statement, State Pension forecast)

- [ ] **BFF Orchestration Layer (`apps/bff-service`)**
  - [ ] Express setup on port `4000`
  - [ ] `/api/page/account-home` endpoint with parallel data fetching
  - [ ] Server-Driven UI logic (dynamically assembling UI schema per persona)

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

- [ ] **Repository Setup**
  - [ ] Initialize `pnpm-workspace.yaml` and root `package.json`
  - [ ] Configure `tsconfig.base.json`
  - [ ] Create `@bff/shared-types` package with GOV.UK component schemas

## DONE
- [x] Project scope and idea approved
- [x] Architecture design (pnpm workspace + Express BFF + React)
- [x] Named project: **BackendFriendsForever**
