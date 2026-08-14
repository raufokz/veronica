# Deployment

Push to `main` → GitHub Actions runs lint + type check, applies any new Supabase
migrations, and then deploys to Vercel. The order matters: the database is
migrated **before** the new build goes live, so a page that reads a new column
never ships ahead of the column itself.

Pipeline lives in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

| Trigger | Lint & types | Supabase migrations | Vercel |
| --- | --- | --- | --- |
| Pull request → `main` | ✅ | — | Preview deploy |
| Push to `main` | ✅ | ✅ `supabase db push` | Production deploy |

Both the migrate and deploy jobs **skip themselves with a warning** if their
secrets are missing, so the pipeline stays green while you finish the one-time
setup below.

---

## One-time setup

### 1. Rotate the database password

The Supabase database password was shared in plain text. Reset it before wiring
anything up: **Supabase dashboard → Project Settings → Database → Reset database
password**. Use the new value everywhere below.

### 2. Baseline the migration history

`supabase/migrations/` now holds the full history, but the first four migrations
were already applied by hand in the SQL Editor. Mark them as applied once so
`db push` doesn't try to re-run them against production:

```bash
npx --yes supabase@latest login
```

That opens a browser to authorize the CLI. Without it every command below fails
with `Unauthorized`. On a machine with no browser, create a token at
supabase.com/dashboard/account/tokens and export it as `SUPABASE_ACCESS_TOKEN`
instead.

Then link the project — it prompts for the database password from step 1:

```bash
npm run db:link
```

```bash
npx --yes supabase@latest migration repair --status applied 20260812000000 20260813000000 20260813010000 20260814000000
```

Confirm local and remote now agree — every row should show both a Local and a
Remote version:

```bash
npm run db:status
```

### 3. Add the GitHub secrets

Repo → Settings → Secrets and variables → Actions → New repository secret.

| Secret | Where to get it |
| --- | --- |
| `SUPABASE_ACCESS_TOKEN` | supabase.com/dashboard/account/tokens |
| `SUPABASE_DB_PASSWORD` | The password from step 1 |
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

```bash
npm i -g vercel && vercel link
```

`.vercel/` is gitignored — read the two IDs out of `.vercel/project.json` and
paste them into GitHub. Never commit that folder.

### 4. Set the Vercel environment variables

Vercel → Project → Settings → Environment Variables. Add each of these to both
**Production** and **Preview** (values are in your local `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — server only, never referenced from a `"use client"` file
- `RESEND_API_KEY`
- `LEAD_NOTIFY_EMAIL`
- `NEXT_PUBLIC_SITE_URL` — the production domain

### 5. Turn off Vercel's own Git deploys

If you connected the repo to Vercel through its GitHub integration, Vercel will
deploy on push *in parallel* with this workflow — which loses the
migrations-first ordering and doubles the builds. Pick one:

- **Keep the workflow (recommended).** Add a `vercel.json` with
  `{ "git": { "deploymentEnabled": { "main": false } } }`, or set an Ignored
  Build Step in the Vercel dashboard. The Action becomes the only deployer.
- **Keep Vercel's integration.** Skip the three `VERCEL_*` secrets entirely; the
  deploy job will skip itself and the workflow just handles CI + migrations.

---

## Day-to-day

```bash
git checkout -b feature/whatever
```

Schema change? Never edit an applied migration — always add a new one:

```bash
npm run db:new describe_the_change
```

Write the SQL into the generated file, apply it locally or to the project with
`npm run db:push`, then regenerate the types and commit them:

```bash
npm run db:types
```

Then push the branch and open a PR. CI checks it and Vercel gives you a preview
URL. Merging to `main` migrates the database and promotes to production.

## Checks before pushing

```bash
npm run lint && npm run typecheck
```
