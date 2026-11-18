# Backend continuation prompt — KITTY CORP Demo Studio

> **Implementation update (18 November 2026):** Supabase project `yjmnmwnljzvvclvipkxy` now has the base relational schema, RLS, private `demo-assets` bucket, server-only demo RPCs, atomic enquiry/event capture, and service-role grants applied. The source includes `src/server/supabase-store.ts` and provider selection via `DATA_PROVIDER=supabase`. The adapter seeds industry/template rows on first read and keeps the existing HMAC admin gateway. The hosting secret `SUPABASE_SECRET_KEY` is intentionally not included in source. See `docs/DEPLOYMENT.md` and `docs/TEST_REPORT.md` for exact configuration and verification gaps. The current repository transaction bridge is transitional for non-demo entity mutations; do not claim full high-concurrency transactional semantics until it is replaced with granular route methods.

You are continuing the working application in the accompanying `KITTY_CORP_FRONTEND.zip`. Integrate a production Supabase backend while preserving the frontend, its routes and the existing creation/editing workflow. This handoff describes the actual implementation; inspect the named files before changing it.

## 1. Product and delivery boundary

The product is a central website-demonstration studio for KITTY CORP. Administrators choose an industry and template, personalise a business website, save a draft, publish `/preview/<slug>`, share a URL/QR and track prospects. There is one application; do not deploy each client concept separately.

The delivered application uses Next.js 16.4.6 App Router, React 19.3.1, TypeScript, Tailwind CSS v4 with a custom stylesheet, Lucide icons, Zod and qrcode. Exact dependencies are locked in `pnpm-lock.yaml`.

The frontend is functional. Local JSON remains the development provider; the production source now includes a server-only Supabase REST/Storage adapter. The connected Supabase project has schema, RLS, private Storage, server-only RPCs and catalogue seeding in place. Production secret configuration, end-to-end validation, distributed abuse controls, monitoring/backups and deployment remain. Do not describe untested production acceptance as complete.

### Already implemented

- Marketing homepage with services, 18 industry links, template showcase, process, indicative INR pricing and the scoped six-month maintenance offer. Official company links point only to `https://thekittycorp.com`.
- All industry routes and 88 specialty presets. Five reusable composition systems (`editorial`, `split`, `immersive`, `minimal`, `structured`) have per-industry content and CSS treatments. These are 88 configurable presets, not 88 independently coded bespoke sites.
- `/templates/<template-key>` previews, separate from saved demos.
- Server-side environment credential login and protected `/admin` workspace; no public registration, OTP or mandatory MFA.
- Dashboard with actual demo counts, industry mix, recent demos/prospects and event counts.
- Demo create/edit/delete/duplicate, unique slugs, optimistic revision checks, draft/published status, private notes and copy/share/QR actions.
- Full content editor: business details, logo/favicon, hero/CTA, about/footer, contacts, image selection/uploads, design controls, metadata, expiry and demo passwords.
- Section editor with add/delete/reorder/show/hide, item editing, images, headings, descriptions, prices, categories and CTA links.
- Desktop live preview with real iframe viewport switching; mobile editing is single-column and exposes a saved-preview link.
- Public industry websites with functional anchors, catalogue search/category filters, gallery enlargement, FAQs, contact links, configured WhatsApp URLs and enquiry forms.
- Local image uploads (PNG/JPEG/WebP, up to 5 MB), folder/name editing, unused-media deletion and guarded private media delivery.
- CRM-lite fields and all eight outreach statuses, with demo links and follow-up dates.
- Validated enquiry capture into the internal inbox, consent, honeypot/timing checks, read/delete actions and basic analytics.
- Publication, expiry and password gates for public pages, submissions/events and uploaded media. Private projections remove notes and hashes.
- Server-generated SEO metadata, noindex controls and generic metadata for locked/unavailable pages.
- Domain and HTTP tests, development fixtures, usage/deployment documentation, Supabase schema/RLS and versioned migrations.

### Completed backend integration in this continuation

- Relational persistence through server-only PostgREST calls for all application entities.
- Retained server-side HMAC admin gateway and HTTP-only sessions; no public signup.
- Private Supabase Storage with metadata and a gated media proxy.
- RLS on all 11 public tables; private admin helper schema; no anonymous base-table access.
- Revision-checked transactional demo create/save/delete RPCs and atomic enquiry/event capture.
- Idempotent first-read seeding of the 18 industries and 88 template presets.

### Remaining production hardening

- Replace the compatibility repository snapshot/diff bridge for non-demo entities with route-specific granular operations before high concurrency or large datasets.
- End-to-end adapter tests using the hosting secret, including actual Storage and RLS role tests.
- Distributed throttling/abuse controls and transaction-safe handling for prospect/asset multi-entity workflows.
- Optional enquiry notifications; current enquiries are stored only and success does not imply email delivery or confirmed booking.
- Monitoring, backups/restore, retention, auditing, migrations and deployment.
- Pagination and server-side analytics aggregates for growth beyond a small workspace.

No live payments, reservations, appointment availability, delivery, calendar sync, email sending, WhatsApp Business API or outreach automation has been implemented. Follow-up dates do not send reminders. Do not add claims implying these integrations exist.

## 2. Read and run the source

```text
src/app/page.tsx                         Marketing site
src/app/[industry]/page.tsx              18 industry collections + /library
src/app/templates/[id]/page.tsx          Template previews
src/app/preview/[slug]/page.tsx          Public preview and metadata/gates
src/app/admin/[[...path]]/page.tsx        Protected studio entry
src/app/api/auth/route.ts                Login/logout
src/app/api/admin/[...path]/route.ts     Admin CRUD/upload API
src/app/api/public/[slug]/[action]/      Unlock, enquiry and event API
src/app/api/media/[id]/route.ts          Access-checked image proxy
src/components/admin-app.tsx            Studio dashboard/management screens
src/components/demo-editor.tsx          Editor and iframe preview
src/components/business-site.tsx        Public renderer, forms and password gate
src/components/template-library.tsx     Searchable collections and design cards
src/lib/types.ts                        Domain and response interfaces
src/lib/catalogue.ts                    Industry/template definitions and factory
src/lib/validation.ts                   Request validation schemas
src/services/client.ts                  PlatformService and fetch implementation
src/server/store.ts                     Local Repository implementation
src/server/auth.ts                      Session/password/origin/rate helpers
src/app/globals.css                     Platform, editor and industry styling
supabase/schema.sql                    Draft tables, constraints, indexes and RLS
development-data/                       Sanitised reference fixtures
tests/                                  Domain and HTTP workflow tests
docs/                                   API, deployment, usage and test report
```

Install Node 22+ and pnpm 11.25.0. Run `pnpm install --frozen-lockfile`, `pnpm setup`, `pnpm dev`. Setup writes ignored `.env.local` with the chosen server-only credentials and a random session secret. Temporary credentials from the original brief are not present in the archive; request/use secure values through the deployment secret manager. `pnpm test:integration` requires the server and reads local environment credentials without printing them.

## 3. Data model and mapping

`src/lib/types.ts` is the source of truth for camelCase frontend shapes. The SQL draft uses snake_case and UUID primary keys. `industries` and `templates` currently use stable string keys in the frontend (`medico`, `restaurant-2`); retain them as `industries.slug` and `templates.template_key`, with a mapping to database UUIDs. Demo IDs, section/item IDs, asset IDs, prospect IDs, enquiry IDs and event IDs already use UUIDs.

| Entity | Purpose and relationships |
| --- | --- |
| `admin_users` | Approved administrator membership, references `auth.users.id`; membership is never self-service |
| `industries` | Unique slug, label and JSON definition |
| `templates` | Unique stable template key, industry FK, layout and definition |
| `template_sections` | Ordered reusable section definitions, template FK |
| `demos` | Unique slug, business name, industry/template FKs, revision, status, design/content/contact/SEO JSON, private notes/hash, expiry and timestamps |
| `demo_sections` | Independent section instances, demo FK, position, kind, visibility and content/items JSON |
| `demo_assets` | Private object metadata; optional originating demo FK, folder, path, MIME and size; assets may be referenced by multiple demos |
| `demo_enquiries` | Demo FK, name/contact, message/kind, status, consent and timestamps |
| `prospects` | Contact details, industry/demo FKs, outreach status, follow-up and private notes |
| `demo_analytics` | Demo FK, event type (`visit`, `whatsapp`, `enquiry`) and timestamp |
| `platform_settings` | Future server-administered configuration; no editable platform-settings API currently exists |

Content consists of `business`, `contact`, `hero`, `design`, `seo`, `settings`, `sections` and `footer`. Sections have stable IDs, a kind, heading, description, visibility, CTA and editable item arrays. Items contain ID, title, text, price, category, image and link. Reordering changes position, not IDs. Duplicate demos must generate new demo and section/item IDs and preserve content independence, while shared asset references may remain.

The browser-facing domain `Database` object remains version 1 and contains demos/prospects/assets/enquiries/analytics arrays. Definitions stay in `catalogue.ts`; the Supabase adapter seeds stable industry/template keys and maps relational rows back to the existing camelCase types. `createDemo()` deep-instantiates a template. The workspace starts empty; `development-data/example-demos.json` contains explicitly fictional drafts for optional development import, not genuine clients.

## 4. Integration boundary and API compatibility

Preserve `PlatformService` in `src/services/client.ts`: `snapshot`, `createDemo`, `saveDemo`, `duplicateDemo`, `deleteDemo`, `upload`, `updateAsset`, `deleteAsset`, `saveProspect`, `deleteProspect`, `readEnquiry`, `deleteEnquiry`. It returns typed records or `{ ok: true }` and throws readable API errors. Components must not import Supabase directly.

The current `Repository` exposes `read()` and `transaction(mutate)`. Local mode uses an in-process promise queue and atomic JSON file rename. Supabase mode currently uses a compatibility snapshot/diff bridge that writes changed records, with transactional RPCs for demo writes and enquiry capture. This preserves the existing route contract but is transitional: replace it with granular route-specific methods before high concurrency or large datasets. Do not expand the snapshot bridge into a bulk database replacement.

Exact paths, input fields, status codes and error envelopes are in `docs/API_CONTRACT.md`. Important rules:

- Every admin route checks the session. Mutations check request origin.
- `PUT /api/admin/demos/:id` sends current `revision`; update only where revision matches, increment atomically, and return 409 on conflict.
- Enforce unique slugs with a database constraint. Create/duplicate retry suffix assignment transactionally; save collision returns 409.
- Password changes use optional write-only `password`/`clearPassword`. Return `hasPassword`; never return a hash.
- `toAdmin()` strips the password hash; `toPublic()` also strips private notes and revision. Preserve that boundary before serialising any React props.
- Delete cascades demo sections/enquiries/events, unlinks prospect.demoId, retains reusable assets.
- Validation errors return 400, missing/unavailable objects 404, authentication 401, invalid origin/password gate 403, conflicts 409, throttle 429.

The snapshot endpoint is intentionally simple. Implement paginated lists and aggregates before large datasets, adding typed service methods rather than coupling components to database queries.

## 5. Authentication and RLS

Local authentication checks `ADMIN_USERNAME`/`ADMIN_PASSWORD` only in the server and signs eight-hour HMAC cookies using a random `SESSION_SECRET`. Cookies are HttpOnly/SameSite=Strict, secure when APP_URL is HTTPS. Running setup rotates the secret and invalidates prior sessions. Demo passwords are salted scrypt hashes; one-hour unlock tokens are bound to the hash so replacing the password invalidates existing demo tokens.

Choose one production strategy and document it: Supabase Auth with server-provisioned admin accounts and approved `admin_users` membership, or a retained server-only credential gateway with privileged server data access. Do not introduce public signup or mandatory OTP/MFA into this brief's workflow. If changing the auth mechanism, retain the login page's simple behavior and verify sessions server-side on every action.

`supabase/schema.sql` and `supabase/migrations/` contain the versioned schema. The migrations have been applied to the connected project. All 11 public tables enable RLS; anonymous roles have no base-table access. Authenticated direct access requires approved membership through `private.is_studio_admin()`. Admin membership writes remain server-only. The helper is SECURITY DEFINER, isolated in the non-exposed `private` schema, has an empty search path and checks `auth.uid()`. The application itself retains its HMAC admin gateway and uses a server-only secret/service-role key.

Do not give anonymous users direct SELECT of the demos table or INSERT into enquiries/analytics. Public reads and writes go through narrow server functions that check status, expiry, password and validation before using privileged database access. The service-role key bypasses RLS; it must stay server-only, and its callers must perform these checks explicitly. Add tests for anonymous, unapproved authenticated, approved admin and privileged server roles.

## 6. Storage

Current uploads write `.data/uploads/<asset-id>` and store metadata in JSON. Images are limited to 5 MB and PNG/JPEG/WebP with byte-signature checks; there is no malware scanning, decompression/pixel-limit check or re-encoding yet.

The private `demo-assets` bucket is applied. The adapter uploads objects using UUID paths, writes metadata rows and serves bytes through `/api/media/:id`; the route checks administrator or published/expiry/password/reference access before proxying. No long-lived signed URLs are exposed. Image pixel/decompression validation and re-encoding remain outstanding.

Asset authorisation currently permits the admin or an accessible published demo that references the URL. A shared asset on any public demo is public. Replace string-search reference discovery with explicit asset usage references or a reliable indexed extraction on saves. Prevent deleting assets that remain referenced. Add an orphan cleanup task only after retention rules are agreed. Built-in `/images/*` stock assets are intentionally public and must contain no client-confidential media.

## 7. Publication, metadata, enquiry and analytics behavior

Publication is a flag inside the central application. Anonymous access requires published status and no past expiry. Locked pages render a password form; locked metadata remains generic/noindexed. Admins can inspect drafts without exposing them publicly. Unpublish must invalidate page/API/storage access promptly. Use dynamic rendering or correctly scoped invalidation; never cache private/draft props publicly.

SEO fields include page title, description, OG image, favicon, canonical URL and noindex. `APP_URL` supplies the origin for default canonical/OG links. Keep the subtle footer attribution to the official KITTY CORP site. Client contact buttons use only configured client details. No fabricated credentials, approvals, results, reviews, availability or contact information should be added to defaults.

Enquiry input: name, email and/or phone, message, kind, consent, hidden website field and start timestamp. No medical or payment fields. Current checks require at least two seconds elapsed, blank honeypot and at most 24 hours since form render. Use a trusted client IP source and durable limiter in production; the current map is process-local and resets on restart. Add stronger abuse protections as needed without silently introducing unrelated onboarding steps.

Enquiry success means the record is stored for the administrator. It is not a confirmed reservation/booking or a delivered message to the client. If adding notifications, handle provider failures/retries and keep this distinction explicit.

Visits are emitted once per browser tab session; WhatsApp clicks and enquiry events are separate. Administrator previews are currently counted, and there is no unique-user measurement, attribution, deduplication across tabs, retention job or bot filtering. Do not label these counts as unique visitors. Add aggregates, retention and any consent policy appropriate to the deployed product.

## 8. Migration from local data

1. Stop writes and back up `.data/database.json`, `.data/uploads/` and the private environment separately. Never place secrets or private records in Git.
2. Seed the 18 industry definitions and 88 template presets from `development-data/catalogue.json` or `catalogue.ts`; map stable keys to UUIDs.
3. Import demos preserving UUIDs, unique slugs, publication status, revision, timestamps, settings and notes. Split section arrays into ordered demo_sections rows. Keep items JSON or normalise further without changing response shapes.
4. Copy each upload to the private bucket; preserve asset UUIDs and map local URL references to the proxy contract. Validate checksums and MIME/size.
5. Import prospects, enquiries and events with correct FKs. The local enquiry record has consent enforced at submission but no separate `consentAt`; use its created timestamp for this legacy import and capture consent explicitly for new submissions.
6. Test all relationships, content counts and storage references. Reconcile missing files or orphaned references before switching traffic.
7. Rotate sessions and admin credentials. Retain or migrate scrypt demo hashes with a compatible verifier; do not weaken protection or discard existing passwords silently.
8. Change the provider only after read/write tests pass. Preserve rollback backups and verify a restore.

## 9. Environment and deployment

Existing runtime variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` (at least 32 characters), `APP_URL`, `DATA_PROVIDER=local`, optional `DATA_DIR`. The Vercel environment marker intentionally blocks the local repository. Set `DATA_PROVIDER=supabase` in production and configure `SUPABASE_URL` plus server-only `SUPABASE_SECRET_KEY` (or legacy `SUPABASE_SERVICE_ROLE_KEY`). Do not remove the local storage guard to make serverless writes appear durable.

Required production variables: `SUPABASE_URL`, server-only `SUPABASE_SECRET_KEY` (or legacy `SUPABASE_SERVICE_ROLE_KEY`), `DATA_PROVIDER=supabase`, plus the existing admin credentials, `SESSION_SECRET` and `APP_URL`. Never expose privileged secrets through `NEXT_PUBLIC_*`.

Use the Vercel Next.js preset, Node 22+, `pnpm install --frozen-lockfile`, `pnpm build`, and the default framework output. App Router needs no custom rewrites. Configure `APP_URL=https://demo.thekittycorp.com`, secure cookies and verified TLS. Follow `docs/DEPLOYMENT.md`. Obtain exact DNS instructions from the hosting provider; do not modify existing records for the main company site automatically.

Official references: [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase private storage](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Vercel domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## 10. Testing and acceptance

Run `pnpm typecheck`, `pnpm test`, `pnpm test:integration` against the local server, and `pnpm build`. Read `docs/TEST_REPORT.md` for this delivery's results and limits. Preserve existing regression coverage and add:

- Supabase role-by-role RLS assertions and service-key isolation.
- Anonymous draft/expired/locked denial for pages, API, images and metadata.
- Two concurrent saves, concurrent slug collisions and atomic duplicate/delete behavior.
- Durable persistence across process restarts and multiple application instances.
- Upload signature/pixel/size validation, shared asset references and deletion constraints.
- Protected password hash compatibility, rotation, session expiry and revocation.
- Enquiry validation/abuse rejection, notification failure handling if added, and accurate success messages.
- Desktop/mobile browser creation, section editing, live/saved previews, QR, catalogue filters, public forms and contact links.
- SEO, no leaked admin fields, production build and deployed-origin tests.

Deliver migration files, backend implementation, production environment documentation and explicit tests. Update this document and the README to distinguish completed integrations from remaining work. The existing frontend should not need to be rebuilt.
