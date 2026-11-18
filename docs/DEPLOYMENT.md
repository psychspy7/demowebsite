# Deployment preparation

## Current backend state

The Supabase schema and application adapter are now included. The connected project `yjmnmwnljzvvclvipkxy` has the relational tables, RLS policies, transactional demo RPCs, atomic enquiry/event RPC and private `demo-assets` bucket applied. The application seeds its industry and template catalogue on first Supabase request.

The existing server-side HMAC administrator login is retained. There is no public signup. All Supabase access is performed server-side through the REST and Storage APIs; the privileged key is never sent to the browser.

## Vercel setup

1. Push this ZIP's extracted project contents to a private GitHub repository. Do not commit `.env.local`, `.data/`, `node_modules/` or `.next/`.
2. Import the repository into Vercel using the Next.js framework preset and Node 22+. Use `pnpm install --frozen-lockfile` and `pnpm build`.
3. Add the following production environment variables in Vercel:
   - `DATA_PROVIDER=supabase`
   - `SUPABASE_URL=https://yjmnmwnljzvvclvipkxy.supabase.co`
   - `SUPABASE_SECRET_KEY` = a secret key from Supabase Settings → API Keys. The legacy service-role key is also accepted. Never use the publishable/anon key here and never prefix this value with `NEXT_PUBLIC_`.
   - `ADMIN_USERNAME` = your chosen private admin ID
   - `ADMIN_PASSWORD` = a new unique password (minimum 12 characters)
   - `SESSION_SECRET` = a cryptographically random value of at least 32 characters
   - `APP_URL` = your verified deployment URL
4. Deploy a Vercel Preview first. Test admin login, creating/editing/duplicating/deleting demos, publish/expiry/password gates, enquiries, analytics and private image upload/download. Verify the first application request seeds the catalogue.
5. Only after Preview tests pass, configure the production URL and deploy. Add `demo.thekittycorp.com` in Vercel's project domain settings and use only the exact DNS records Vercel supplies. Do not alter apex or `www` records for `thekittycorp.com`.
6. Verify TLS, cookies, canonical/OG URLs and published/private access from both signed-in and anonymous browsers.

The Supabase project has been modified, but the website has not been deployed and no DNS records have been changed. The service/secret key is intentionally not included in this archive; retrieve it from the Supabase dashboard and add it only to the hosting secret manager.

## Production acceptance

- Durable database, private object storage and backups; real migration/restore exercise.
- Approved admin identity, revocation, secure session expiry and credential rotation.
- Atomic revision and slug checks; transaction-safe duplicate/save/delete operations.
- RLS tested as anonymous, unapproved authenticated, admin and service roles.
- Server-validated publication/expiry/password checks on pages, forms, events and images.
- Distributed rate limiting, upload dimension/decompression checks, image re-encoding and observability.
- No sensitive fields in public HTML, JSON, logs, analytics or error traces.
- Appropriate retention/deletion rules for prospects, enquiries and media.
- Optional enquiry email delivery only after sender/domain configuration and explicit product decision; the current success state must not imply delivery.

References: [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying), [Vercel custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase storage access](https://supabase.com/docs/guides/storage/security/access-control).
