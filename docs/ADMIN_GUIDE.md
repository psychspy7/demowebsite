# Studio administrator guide

## Start a personalised demo

1. Run the setup command and start the server. Sign in at `/admin`.
2. Choose **Create a demo**, filter the template collection by industry/style, and use the arrow beside a design. Clicking the design image opens its template preview.
3. Enter the business name. The app creates an independent draft with a unique URL slug.
4. In **Content**, change the name, category, tagline, logo, hero, primary CTA, about copy and footer.
5. In **Sections**, expand a section. Change headings, descriptions, buttons and item details. Add/remove items, add sections, move sections up/down or hide them. Team and testimonial content starts empty to avoid invented credentials and endorsements.
6. In **Design**, select the layout, colours, font family, theme and button shape. The preview updates immediately on desktop; use its desktop/mobile controls to inspect the responsive layout.
7. In **Contact**, enter the actual client phone/WhatsApp (with country code), email, address, map and social links. Empty contact fields are omitted from public pages.
8. In **Publishing**, choose the URL slug, title/description, social image, favicon and canonical URL. Configure noindex, demo label, expiry and optional password. Internal notes remain private.
9. **Save** persists your changes. **Saved preview** opens the saved version. A draft can be viewed only while signed in as an administrator.
10. **Publish demo** makes the page available at `/preview/<slug>` on the same running server. **Unpublish** removes public access without deleting the record.
11. From **My demos**, copy the URL or open the QR dialog and download the QR PNG. Localhost is accessible only from the local device; public sharing needs a deployed backend and reachable domain.

All changes require Save or Publish. Closing a tab with unsaved changes triggers a browser warning. Save before using another studio navigation item. Concurrent saves are rejected with a conflict instead of silently overwriting changes; copy unsaved text if needed, then reload the editor.

## Images

Upload PNG, JPEG or WebP images up to 5 MB. SVG and unsupported formats are rejected. Use meaningful filenames. The media library supports folder/name editing, filtering, uploads and deletion. Use any editor image field to select an existing image, enter an http(s) URL, upload a replacement or clear an image. External image URLs depend on the remote host staying available.

Unused and draft-only uploads require admin access. Published image requests are permitted only while an eligible, accessible demo references them. Password-protected images require the corresponding demo unlock cookie. Reusing a protected image on an unprotected published demo makes that image public. Do not reuse confidential assets across different visibility levels.

## Prospects and enquiries

Add a prospect, contact details, industry, linked demo, outreach status, follow-up date and private notes. Edit or delete prospect records from the table. Follow-up dates are stored; they do not schedule reminders or send outreach.

Published website enquiry forms validate names, contact details, messages and consent. They reject simple honeypot and rapid submissions. Successful entries appear in **Enquiries** and can be marked read or deleted. This is enquiry capture, not confirmed booking or an automatic message to the client. Never request medical records or sensitive health data through these forms.

## Activity and visibility

Dashboard counts reflect actual stored records. Visit events are counted once per browser tab session, including administrator previews. WhatsApp clicks and enquiries are recorded separately. There is no funnel attribution, bot filtering or unique-person measurement.

Password-protected pages use an eight-character minimum demo password and a one-hour unlock cookie. Admin sessions last eight hours. Expiry is entered in the device's local time and stored as UTC. Keep noindex enabled for demonstration content unless there is a reason to index it. Changing a slug invalidates its previous link and QR code.

Deleting a demo removes its sections, enquiries and analytics, and unlinks any associated prospects. Assets remain available unless explicitly deleted. Duplicating creates a new draft, new IDs and independent content, while referencing the same image assets. Password settings are copied and can be changed in the new draft.

## Administration

Change admin credentials using `pnpm setup` and restart the server. This rotates the session signing secret. The Settings export downloads private records without password hashes or image bytes; it is an inspection export, not a complete backup. For a local backup, stop the server and copy `.data/` plus `.env.local` to an appropriately protected location. Keep these files out of source control and archives shared with developers.
