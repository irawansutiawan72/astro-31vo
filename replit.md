# Numatik

Numatik (Numerasi Aktif dengan Teknologi Informasi dan Komunikasi) is an educational numeracy app for students.

## Run & Operate

- **Frontend** — workflow `Start application` installs the Numatik dependency graph with `pnpm install --filter @workspace/numatik... --frozen-lockfile` (falling back to the same filtered install without `--frozen-lockfile` when needed), then runs `pnpm --filter @workspace/numatik run dev`. Vite listens on `0.0.0.0:$PORT` with `PORT=18860` for the managed preview. **Source of truth: `artifacts/numatik/src/`** — this is the only location to edit; Vercel build also uses this package.
- **API server** — workflow `Numatik API Server` starts the separate Express 5 backend package (`PORT=8080 pnpm --filter @workspace/api-server run dev`); requires `DATABASE_URL`.
- `artifact.toml` files exist under `artifacts/*/.replit-artifact/` but artifact registration is not preserved across GitHub imports — `listArtifacts()` returns empty. The direct `Start application` workflow is the reliable import/clone entry point for the frontend; the artifact workflow remains as service metadata.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (needed for backend only; frontend runs without it)
- First-time setup after import: the `Start application` workflow installs the Numatik dependency graph automatically at the repo root before starting the frontend. For a manual setup, run `pnpm install --filter @workspace/numatik... --frozen-lockfile` (or the same command without `--frozen-lockfile` if the lockfile is intentionally out of sync).

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `.migration-backup/` is git-ignored but its files are **already tracked** in git (committed before the `.gitignore` rule was added). Any changes to component files must be made in `artifacts/numatik/src/` only — `.migration-backup/` is no longer the active source.
- The AI tutor `/api/chat` endpoint (originally in `.migration-backup/server.ts`) is not wired in the current `artifacts/numatik` setup. Needs `GROQ_API_KEY` and backend wiring if revived.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
