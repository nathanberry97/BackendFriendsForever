# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BackendFriendsForever is a proof-of-concept demonstrating the Backend-for-Frontend (BFF) architecture pattern. It simulates a GOV.UK-style account home page where a BFF layer orchestrates calls to multiple department APIs (HMRC, DVLA, DWP) and returns a server-driven UI payload that a "dumb" React frontend renders dynamically.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  web-frontend   │────▶│   bff-service    │────▶│    mock-apis    │
│  (React/Vite)   │     │  (Express BFF)   │     │   (Express)     │
│  port 3000      │     │  port 4000       │     │   port 4001     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

- **`apps/mock-apis`** — Simulates government department APIs (UDP user profiles, HMRC, DVLA, DWP). 8 test personas (`cit-000` through `cit-007`) cover all department linkage permutations.
- **`apps/bff-service`** — Orchestration layer that fetches from mock APIs in parallel and assembles a `BFFLayoutResponse` (server-driven UI schema) tailored to the user's linked departments.
- **`apps/web-frontend`** — React frontend that receives the UI schema and renders components dynamically via a `<ComponentRenderer />` mapper. Uses GDS colour tokens via Tailwind.
- **`packages/shared-types`** — Shared TypeScript types (`@bff/shared-types`) consumed by both the BFF and frontend.

## Commands

```bash
pnpm install          # Install all workspace dependencies
pnpm dev              # Run all apps in parallel (mock-apis + bff-service + web-frontend)
pnpm dev:apis         # Run mock-apis only
pnpm dev:bff          # Run bff-service only
pnpm dev:web          # Run web-frontend only
```

## Workspace Structure

This is a pnpm monorepo. Workspaces are defined in `pnpm-workspace.yaml`:
- `apps/*` — Runnable applications
- `packages/*` — Shared libraries (referenced via `@bff/` scope)

## TypeScript

The root `tsconfig.base.json` targets ES2022 with NodeNext module resolution and strict mode. Each app extends this base config.
