# KITTY CORP DEMO STUDIO — AI HANDOFF & FUTURE DEVELOPER GUIDE

> **Note for Future AI Agents & Developers:**  
> This file is the primary single-source-of-truth reference for the KITTY CORP Demo Studio. Read this document to immediately understand the entire codebase, architecture, database schemas, styling system, and deployment workflows without needing to reverse-engineer individual files.

---

## 1. Project Overview & Business Purpose
The **KITTY CORP Demo Studio** is a multi-tenant, high-performance web platform designed to create, preview, customize, and share interactive business demo websites for potential clients across **18 distinct industries** and **88 specialty presets**.

* **Production URL**: `https://demo.thekittycorp.com`
* **GitHub Repository**: `psychspy7/demowebsite` (branch: `main`)
* **Primary Technologies**:
  - **Framework**: Next.js 16.4 (App Router, Turbopack, React 19, TypeScript)
  - **Styling**: Tailwind CSS v4 with custom responsive utilities in `src/app/globals.css`
  - **Backend & Database**: Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage
  - **Package Manager**: pnpm (`pnpm@11.25.0`)
  - **Runtime**: Node.js >= 22.0.0

---

## 2. Directory Structure & Key Files

```text
kitty-corp-demo-studio/
├── .env.example                 # Template for required environment variables
├── next.config.mjs              # Next.js production configuration
├── package.json                 # Dependencies and npm scripts
├── pnpm-lock.yaml               # Pinned package lockfile
├── public/
│   └── images/                  # Bundled high-res photography for all 18 industries
├── development-data/
│   ├── catalogue.json           # Complete JSON definition of industries and 88 templates
│   └── example-demos.json       # Seed demos for offline testing
├── docs/                        # In-depth architectural & API manuals
│   ├── ADMIN_GUIDE.md           # Instructions for studio admin users
│   ├── API_CONTRACT.md          # REST API schemas & payload definitions
│   ├── ASSET_SOURCES.md         # Image asset provenance & licenses
│   ├── DEPLOYMENT.md            # Vercel & Supabase deployment setup
│   ├── TEST_REPORT.md           # Test results & coverage report
│   └── AI_HANDOFF_AND_FUTURE_GUIDE.md # This guide
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── [industry]/page.tsx  # Dynamic industry landing pages (e.g. /medico)
│   │   ├── admin/[[...path]]/   # Studio admin workspace route
│   │   ├── api/
│   │   │   ├── admin/[...path]/ # Protected studio admin API (demos, CRM, assets)
│   │   │   ├── auth/route.ts    # Secure HMAC cookie-based session auth
│   │   │   ├── health/route.ts  # Liveness and database connectivity probe
│   │   │   ├── media/[id]/      # Private asset streaming & caching proxy
│   │   │   └── public/[slug]/   # Public preview actions (enquiry, analytics)
│   │   ├── preview/[slug]/      # Client-facing interactive demo website
│   │   ├── templates/[id]/      # Template preview & demo generator
│   │   ├── globals.css          # Master stylesheet (Tailwind v4 + custom components)
│   │   ├── layout.tsx           # Global root HTML & metadata layout
│   │   ├── not-found.tsx        # Branded 404 handler
│   │   ├── page.tsx             # Homepage: industry directory & studio entry
│   │   └── robots.ts            # Robots.txt generator
│   ├── components/
│   │   ├── admin-app.tsx        # Full admin studio SPA (Tabs: Demos, CRM, Enquiries, Media, Analytics)
│   │   ├── brand.tsx            # Logo, brand typography, and status badges
│   │   ├── business-site.tsx    # Live demo website renderer (Header, Hero, Services, Testimonials, Form, Footer)
│   │   ├── demo-editor.tsx      # Dual-pane visual live editor with real-time iframe preview
│   │   ├── login.tsx            # Admin authentication modal dialog
│   │   ├── template-library.tsx # Interactive visual template filter & selector
│   │   └── ui.tsx               # Reusable buttons, cards, modals, tabs, and notifications
│   ├── lib/
│   │   ├── catalogue.ts         # Industry & template metadata definitions
│   │   ├── types.ts             # TypeScript domain models & interfaces
│   │   └── validation.ts        # Zod input validation schemas
│   └── server/
│       ├── auth.ts              # Cryptographic HMAC session signing & password hashing
│       ├── store.ts             # Repository pattern (Local file store fallback + Supabase store)
│       └── supabase-store.ts    # Granular Supabase REST adapter & Storage client
├── supabase/
│   ├── migrations/              # Versioned PostgreSQL migration scripts
│   │   ├── 20261118072539_kitty_corp_demo_studio_core.sql
│   │   ├── 20261118072813_kitty_corp_atomic_enquiry_capture.sql
│   │   ├── 20261118072948_kitty_corp_service_role_privileges.sql
│   │   ├── 20261118073027_kitty_corp_private_admin_helper_and_fk_indexes.sql
│   │   └── 20261118100000_performance_indexes_and_triggers.sql
│   └── schema.sql               # Consolidated complete database DDL
└── tests/
    ├── domain.test.ts           # Automated domain unit tests (validation, auth, business logic)
    └── integration.ts           # End-to-end integration test runner
```

---

## 3. Database Architecture (Supabase PostgreSQL)

### Tables & RLS Status:
1. `public.admin_users`: Studio admin accounts. Protected by `private.is_studio_admin()`.
2. `public.industries`: 18 industry definitions (slug, name, metadata).
3. `public.templates`: 88 specialty templates linked to industries.
4. `public.template_sections`: Default sections for each template.
5. `public.demos`: User-created customized business demos. Includes revision counter for concurrent edit conflict prevention.
6. `public.demo_sections`: Ordered content blocks for each demo (Hero, Services, Gallery, FAQ, Contact, etc.).
7. `public.demo_assets`: Uploaded media files mapped to Supabase Storage bucket `demo-assets`.
8. `public.demo_enquiries`: Captured prospect leads from the public demo contact forms.
9. `public.prospects`: CRM contact records tracking sales pipeline stages.
10. `public.demo_analytics`: Event tracking (`visit`, `whatsapp`, `enquiry`).
11. `public.platform_settings`: Key-value JSON platform configuration.

### Stored Procedures (Atomic RPCs):
* `public.studio_create_demo(p_demo jsonb)`: Creates a demo and its sections atomically.
* `public.studio_save_demo(p_demo jsonb, p_expected_revision int)`: Saves changes, verifies `revision = p_expected_revision` to prevent overwrite collisions, replaces sections, and increments revision.
* `public.studio_duplicate_demo(p_source_id uuid, p_new_slug text, p_new_business_name text)`: Clones an existing demo and all its nested sections entirely inside PostgreSQL.
* `public.studio_delete_demo(p_id uuid)`: Removes a demo with cascade deletion.
* `public.studio_capture_enquiry(p_enquiry jsonb, p_event jsonb)`: Atomically inserts lead into `demo_enquiries` and registers an event in `demo_analytics`.
* `public.touch_updated_at()`: Trigger function with safe `SET search_path = ''` to automatically bump `updated_at`.

---

## 4. Authentication Architecture & Security

### Critical Secret Key Header Rule:
Supabase secret keys starting with `sb_secret_` are **opaque API keys**, NOT JWT tokens. 
* Sending `Authorization: Bearer <sb_secret_>` causes Supabase PostgREST/Storage to reject requests with `401 Invalid JWT`.
* `src/server/supabase-store.ts` correctly handles this:
  ```typescript
  headers.set("apikey", key);
  if (key.startsWith("eyJ")) {
    headers.set("Authorization", `Bearer ${key}`);
  }
  ```
* This ensures modern secret keys authenticate seamlessly without error.

### Admin Session:
* Sessions are HMAC-SHA256 signed tokens stored in an `httpOnly`, `SameSite=Lax`, `Secure` cookie named `kc_studio_session`.
* Passwords are hashed using SHA-256 with a salt derived from `SESSION_SECRET`.

---

## 5. Environment Variables

Configure these in Vercel or `.env.local`:

| Variable | Description | Example (Production) |
| :--- | :--- | :--- |
| `DATA_PROVIDER` | Persistence engine (`local` or `supabase`) | `supabase` |
| `APP_URL` | Canonical website base URL | `https://demo.thekittycorp.com` |
| `ADMIN_USERNAME` | Admin login username | (secure unique username) |
| `ADMIN_PASSWORD` | Admin login password (min 12 chars) | (secure unique password) |
| `SESSION_SECRET` | Random hex string for HMAC signing (min 32 chars) | (64-character hex string) |
| `SUPABASE_URL` | Supabase project REST URL | `https://mgkghnblbisubympudaa.supabase.co` |
| `SUPABASE_SECRET_KEY`| Supabase service-role or secret key | `sb_secret_...` or `eyJ...` |

---

## 6. How to Develop & Test

```bash
# 1. Install dependencies
pnpm install

# 2. Run TypeScript typecheck
pnpm typecheck

# 3. Run unit tests
pnpm test

# 4. Run production build
pnpm build

# 5. Start development server
pnpm dev
```

---

## 7. Extending the Studio (For Future AIs / Devs)

* **To add a new Industry**: Add entry to `src/lib/catalogue.ts` in the `industries` array, and place a corresponding 16:9 JPEG image in `public/images/<industry>.jpg`.
* **To add a new Template**: Add entry to `src/lib/catalogue.ts` in the `templates` array specifying the industry ID, layout style (`editorial`, `split`, `immersive`, `minimal`, or `structured`), and default sections.
* **To modify Demo Layouts**: Edit `src/components/business-site.tsx`. It handles responsive rendering, responsive navigation, inquiry modals, WhatsApp direct clickouts, and dark/light mode accents.
