# Validation report

Validation date: 18 November 2026. This report distinguishes completed checks from an environment limitation during the final rerun.

## Completed successfully

| Check | Result |
| --- | --- |
| Dependency installation | Passed with pnpm 11.25.0; esbuild's install script explicitly allowed in pnpm-workspace.yaml |
| TypeScript validation | Passed, including the final formatted source |
| Domain tests | 8 passed, 0 failed on the final source |
| HTTP integration tests | 17 workflows passed before the permission change |
| Industry routing | All 18 industry routes returned 200 |
| Template routing | All 88 implemented template preview routes returned 200 and contained the preview label |
| Production build | Passed earlier: Next.js 16.4.6 compiled, typechecked and generated 112 static pages |
| Browser sign-in | Passed after correcting local origin handling for localhost/127.0.0.1 |
| Browser create/edit/save/publish | Created an illustrative café, edited its headline, saved, published and opened its generated URL |
| Live editor preview | Verified changed headline in the iframe and switched between desktop and 390px mobile layouts |
| Responsive public demo | Inspected at 390px; no horizontal overflow and no broken images in the inspected page |
| Mobile navigation | Opened menu and followed the enquiry anchor successfully |

The integration suite verified anonymous admin denial, invalid login, HttpOnly/SameSite cookies, cross-origin mutation denial, all routes, draft privacy, authenticated previews, independent duplicate IDs/content, real JPEG uploads, private media access, unsafe upload rejection, content/section persistence, publishing, SEO/noindex/WhatsApp output, no private-note/password leakage, stale-revision conflicts, slug conflicts, referenced-asset deletion protection, enquiry validation/spam checks/storage, analytics, demo passwords, protected media, expiry/unpublish, and prospect create/update/link behavior. It cleaned up its own QA records after execution.

The eight domain tests cover every template's validity and bundled image, independent instantiation, private-field projection, publication/expiry, executable URL/image/style rejection, slug/WhatsApp normalisation, enquiry contact/consent and prospect statuses.

## Final rerun limitation

The execution environment changed from unrestricted access to a managed sandbox during verification. Subsequent localhost requests initially returned EACCES; additional access was requested and granted. The original development server was no longer running, and Windows native path canonicalisation continued to return Access Denied/EPERM even for explicitly allowed workspace files. This prevented Next.js's native compiler from completing the final rebuild and restarting the server. It is an execution-host restriction, not a TypeScript or application test failure.

After the successful build, the remaining changes were a local file-tracing exclusion, a standard JavaScript Next.js configuration file, readability improvements to studio typography, source formatting, documentation, and additional test assertions. The final rebuild could not be verified under the changed permissions. The included suite now adds a browser-origin regression check and explicit deletion/cascade assertions; these new assertions were not rerun successfully after the sandbox changed. Run the documented commands on an ordinary local Node environment before deployment.

The earlier build emitted a warning about dynamic filesystem tracing. Runtime `.data`, environment files, tests and development fixtures now have explicit output-tracing exclusions, and the runtime path is marked to avoid static tracing. Verification of the warning's removal is part of the pending rebuild.

Browser tools also became unavailable before completing the final public-form UI submission and saving screenshot files. Enquiry submission and success persistence were verified through real HTTP integration tests. Browser checks covered representative layouts; all 88 template routes were checked by HTTP, not individually visually audited on every breakpoint.

## Reproduce

```sh
pnpm install --frozen-lockfile
pnpm setup
pnpm typecheck
pnpm test
pnpm dev
# In another terminal:
pnpm test:integration
# Stop the development server, then:
pnpm build
pnpm start
```

## Supabase integration work in this delivery

- Applied migrations `kitty_corp_demo_studio_core`, `kitty_corp_atomic_enquiry_capture`, `kitty_corp_service_role_privileges`, and `kitty_corp_private_admin_helper_and_fk_indexes` to project `yjmnmwnljzvvclvipkxy`.
- Verified all 11 application tables exist with RLS enabled using the Supabase table inspector.
- Verified the private `demo-assets` bucket exists with a 5 MiB limit and PNG/JPEG/WebP allowlist.
- Verified the four `studio_*` RPCs exist and run as SECURITY INVOKER (not SECURITY DEFINER); SQL smoke tests passed for demo create/revision-save/delete and atomic enquiry+analytics capture.
- Verified the RPC execute grants: service_role can execute; anon and authenticated cannot.
- Queried Supabase security advisors after moving the admin helper into a non-exposed `private` schema; no security lints were returned. Performance advisor reports unused indexes on the currently empty tables; these are informational on a newly created schema.
- Added a server-only PostgREST/Storage adapter, idempotent industry/template seeding, transactional demo RPC usage, private media proxy integration and environment documentation.

## Not verified / remaining before production

The privileged Supabase secret key is not available through the connected project metadata and is intentionally not embedded in the ZIP. The owner must add `SUPABASE_SECRET_KEY` (or the legacy service-role key) to the hosting secret manager. Consequently, this environment could not execute end-to-end application CRUD or Storage tests through the new adapter. Package installation could not be performed because pnpm 11.25.0 was not installed and the sandbox could not reach the npm registry; the final Next.js build, TypeScript check with project dependencies, domain suite and HTTP integration suite were therefore not rerun after the backend changes. A global TypeScript attempt was blocked by missing installed Next.js/React/Zod/Node type packages and is not counted as a passing check.

The compatibility repository transaction bridge reads the workspace and persists changed entities. Demo create/save/delete are revision-checked RPC operations; enquiry+event capture is atomic. Other entity changes are separate REST operations and need route-specific transaction methods before heavy concurrent use. Distributed rate limiting, decoded-pixel validation/re-encoding, backups/restore drill, retention, observability, production browser tests and high-volume pagination remain outstanding. No Vercel deployment, DNS changes, real client data import, payment service, email delivery or external booking integration was performed. Run all commands in the Reproduce section after installing dependencies, then complete the production acceptance checklist before launch.
