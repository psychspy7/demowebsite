# KITTY CORP Demo Studio

A Next.js website demonstration studio for KITTY CORP, with a local development repository and a Supabase-backed production persistence adapter. Build personalised business website concepts, manage prospects and publish demo paths through one application.

## Quick start

Requirements: Node.js 22 or newer and pnpm 11.25.0. The tested runtime is Node 24.22.1.

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm setup
pnpm dev
```

If Corepack is not installed, install pnpm through its official installation instructions, or run `npm install -g pnpm@11.25.0`. The setup command asks for an admin ID, a password and the local app URL. Enter the temporary credentials from your original brief only for local evaluation; choose fresh credentials before production. The supplied credentials are deliberately absent from this package. `.env.example` contains placeholders. `.env.local` is ignored by Git.

Open `http://127.0.0.1:3000`, then **Open studio**. If you use `localhost`, set `APP_URL=http://localhost:3000`; both loopback names are accepted in development. Save/publish generates a path on the same application. Localhost links are not externally reachable.

## Included

- Responsive marketing site, official enquiry links, indicative pricing and six-month maintenance offer.
- 18 industry libraries and 88 editable specialty presets using five layout systems with industry-specific content and visual treatment. These are reusable presets, not 88 separately handcrafted codebases.
- Protected admin login, dashboard, demo management, template search, media library, prospects, enquiries and basic activity counts.
- Independent demo creation and duplication, content/section editing, ordering/visibility, styles, contact links, media, SEO, notes and desktop/mobile live previews on desktop screens.
- Save draft, publish/unpublish, unique demo paths, QR downloads, optional expiry, password protection and noindex.
- Server-validated enquiry forms with consent, honeypot, timing check and process-local throttling. Enquiries reach the studio inbox; no email or WhatsApp message is sent automatically.
- Supabase PostgreSQL persistence for demos, sections, prospects, enquiries, analytics and asset metadata; transactional RPCs protect demo create/save/delete and enquiry capture.
- Private Supabase Storage uploads and an access-checked application media proxy.
- Server-only Supabase REST adapter using a secret/service-role key; the existing HMAC admin login is retained, with no public signup.
- RLS-enabled relational schema, private Storage bucket, migrations and idempotent seeding of 18 industries and 88 template presets.

## Architecture

```text
src/app/                 Next.js pages and HTTP routes
src/components/          Platform, studio editor and business-site renderer
src/lib/                 Shared domain types, template definitions and validation
src/services/client.ts   Browser-facing PlatformService contract
src/server/auth.ts       Local authentication and publication-gate helpers
src/server/store.ts      Repository interface and local/Supabase provider selection
src/server/supabase-store.ts Server-only PostgREST + private Storage adapter
public/images/           Bundled illustrative stock photos
development-data/        Sanitised reference fixtures for the next phase
supabase/schema.sql      Schema, RLS, storage and server-only transactional RPCs
supabase/migrations/     Applied schema and atomic enquiry migrations
docs/                    Admin guide, API contract, deployment and asset sources
tests/                   Domain tests and real HTTP workflow tests
scripts/                 Setup and fixture export
```

Runtime records live in `.data/database.json`; uploaded bytes live in `.data/uploads/<uuid>`. The archive starts with an empty workspace. Template fixtures live in `src/lib/catalogue.ts`, separately from demo records. `pnpm fixtures:export` regenerates the reference JSON in `development-data/`; it does not mutate runtime records.

## Commands

```sh
pnpm typecheck
pnpm test
pnpm test:integration  # Requires a running local server and configured .env.local
pnpm build
pnpm start            # Start the production build locally
```

Integration tests create and delete only their own QA records. `TEST_BASE_URL` can target a second local port. Never run these tests against production.

## Supabase production configuration

The connected Supabase project has its schema, RLS policies, private `demo-assets` bucket and server-only RPCs applied. On the first application request, the adapter seeds the 18 industry definitions and 88 template records. The frontend continues to use its existing HTTP `PlatformService`; browser components never receive Supabase credentials.

For production, set these variables in Vercel (or your Node host) before switching `DATA_PROVIDER` to `supabase`:

- `DATA_PROVIDER=supabase`
- `SUPABASE_URL=https://yjmnmwnljzvvclvipkxy.supabase.co`
- `SUPABASE_SECRET_KEY` = the project's secret key from Supabase Settings → API Keys (or legacy service-role key). This is server-only; never use a `NEXT_PUBLIC_` prefix.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` (use a new unique password of at least 12 characters), `SESSION_SECRET` (at least 32 random characters), and `APP_URL`.

The current HMAC admin gateway is intentionally retained. Supabase Auth users are not required for this gateway; the privileged key is held only by the server and the database's anonymous/authenticated table policies remain default-deny. Never commit real environment values.

## Remaining production hardening

The compatibility `Repository.transaction` bridge currently loads a workspace snapshot and writes only changed records; demo writes use revision-checked database RPCs and enquiry+event capture uses one RPC. This bridge is suitable for the current small single-workspace product but is not a fully general multi-entity transaction engine. Before high-concurrency or large-scale operation, replace it with route-specific granular methods and add pagination. Process-local abuse throttling still needs a distributed limiter; image uploads still need decoded-pixel limits/re-encoding or malware scanning; operational monitoring, backup/restore drills, retention policies, and end-to-end production browser tests remain outstanding. Enquiry capture stores the enquiry; it does not send email or confirm a booking.

Local development remains `DATA_PROVIDER=local`; it uses `.data/` and is not suitable for Vercel or multiple server instances. No hosting deployment, DNS change, or main-domain change has been made. See `docs/DEPLOYMENT.md` and `BACKEND_CONTINUATION_PROMPT.md`.

Analytics are basic event counts, not unique-visitor attribution. There is no payment, delivery, reservation, calendar or live booking integration. All template business content is illustrative and must be replaced with approved details. Empty team/testimonial sections remain hidden. Mobile editing uses a single-column editor with a separate saved preview; the side-by-side live canvas appears on desktop.

The media library can organise or delete unused uploads. Replace images through any editor image field. Uploaded media are immutable; replacing a file creates a new asset. Deleting a referenced image is prevented. Built-in stock images are public assets, so do not put confidential business images in `public/`.

## Guides

- `docs/ADMIN_GUIDE.md`: the day-to-day creation and sharing workflow.
- `docs/API_CONTRACT.md`: exact endpoints, payloads and error behavior.
- `docs/DEPLOYMENT.md`: Vercel and domain preparation, with the backend gate.
- `docs/ASSET_SOURCES.md`: bundled image references and usage notes.
- `docs/TEST_REPORT.md`: executed validation and known verification limits.
- `BACKEND_CONTINUATION_PROMPT.md`: implementation-specific handoff.

Framework reference: [Next.js App Router documentation](https://nextjs.org/docs/app). No third-party API keys, personal prospect records, uploaded user files or admin credentials are included in the source archive.
