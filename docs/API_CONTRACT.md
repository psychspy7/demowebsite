# HTTP and service contract

The React frontend calls `PlatformService` from `src/services/client.ts`. Preserve this interface and the JSON shapes in `src/lib/types.ts` when replacing the development backend. All mutations are same-origin and all `/api/admin/*` routes require a valid server session. Success returns JSON; failure returns `{ "error": "readable message" }` with a non-2xx status.

## Authentication

| Method/path | Input | Result |
| --- | --- | --- |
| `POST /api/auth` | `{ username, password }` | `{ ok: true }`, HttpOnly SameSite=Strict `kitty_session` cookie |
| `DELETE /api/auth` | none | Clears cookie |

The local ID/password are checked only on the server. Eight-hour HMAC sessions use `SESSION_SECRET`. Rate limit: 8 login attempts/minute per process/IP. Production auth must preserve the simple single-admin UX; there is no signup, OTP or mandatory MFA screen.

## Admin

| Method/path | Input | Result |
| --- | --- | --- |
| `GET /api/admin/snapshot` | none | `Snapshot`: admin demos, prospects, assets, enquiries, analytics |
| `POST /api/admin/demos` | `{ templateId, businessName }` | New `AdminDemo`, HTTP 201 |
| `PUT /api/admin/demos/:id` | Editable `AdminDemo` fields and current `revision` | Updated `AdminDemo`, incremented revision |
| `POST /api/admin/demos/:id/duplicate` | none | Independent draft `AdminDemo` |
| `DELETE /api/admin/demos/:id` | none | `{ ok: true }`; enquiries/events cascade, prospects unlinked |
| `POST /api/admin/assets` | multipart `file`, optional `folder` | `Asset`, HTTP 201 |
| `PATCH /api/admin/assets/:id` | `{ name?, folder? }` | Updated asset |
| `DELETE /api/admin/assets/:id` | none | `{ ok: true }`; 409 if referenced by any demo |
| `POST /api/admin/prospects` | Prospect fields, without ID/dates | Prospect |
| `PUT /api/admin/prospects/:id` | Prospect fields | Prospect |
| `DELETE /api/admin/prospects/:id` | none | `{ ok: true }` |
| `PATCH /api/admin/enquiries/:id` | none | Marks read |
| `DELETE /api/admin/enquiries/:id` | none | Removes enquiry |

Demo validation is `demoSchema`; new-demo, prospect and enquiry schemas are beside it. Status is `draft` or `published`. `password` is optional write-only plaintext, minimum eight characters; `clearPassword: true` removes protection. Responses contain `hasPassword`, never the hash. A stale revision or duplicate slug returns 409. Invalid fields return 400, missing objects 404, unauthenticated requests 401, invalid origin 403. Generic server failures return 500.

`business`, `contact`, `hero`, `design`, `seo`, `settings`, `sections`, `footer` and `notes` are editable. `id`, `createdAt`, `updatedAt` and hash generation are server-managed. `settings` from the frontend contains `expiresAt` and `showDemoLabel`. Slugs use lowercase ASCII letters/numbers/hyphens. Fonts are `sans`, `serif`, `mono`; colours are six-digit hex strings. Image URLs accept bundled `/images/*`, `/api/media/<uuid>` or http(s). CTA links allow http(s), mailto, tel or anchors. HTML is rendered as escaped text, never injected.

## Public

| Method/path | Behavior |
| --- | --- |
| `GET /preview/:slug` | Server-rendered public projection; unavailable demos 404; password form when locked; signed-in admins can inspect drafts |
| `POST /api/public/:slug/unlock` | `{ password }` -> one-hour HttpOnly demo cookie; wrong password 401 |
| `POST /api/public/:slug/enquiries` | `{ name, email, phone, message, kind, website, startedAt, consent: true }` -> 201 after validation |
| `POST /api/public/:slug/events` | `{ type: "visit" | "whatsapp" }` -> `{ ok: true }` |
| `GET /api/media/:id` | Private proxy; admin access or a published, unexpired, unlocked referencing demo; otherwise 404 |

Public POST endpoints repeat publication, expiry and password checks. Enquiries require a name, email or valid phone, message of 5–1500 characters, consent, blank honeypot `website`, and a `startedAt` timestamp 2 seconds to 24 hours old. Limit: 5 submissions/unlock attempts per minute; events: 50/minute. Throttles are in-memory and must become durable in production. No medical fields, payments, reservations, email sending or WhatsApp API integrations exist.

The public page projection removes private notes, revision and password hashes before props reach the browser. Locked/unavailable metadata is generic and noindexed. Media proxies use `private, no-store` and serve a validated MIME type.

## Server seam

`Repository.read(): Promise<Database>` returns the local document; `transaction(mutate)` serialises modifications in one Node process and atomically replaces the file. It is intentionally a development interface, not a suggested full-database Supabase download. Implement granular queries/RPC transactions inside the existing route handlers or a new server application-service layer, preserving the browser `PlatformService` contract. Do not synchronise whole snapshots back to Supabase. Add pagination and server-side aggregates before large datasets.
