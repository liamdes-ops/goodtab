# Goodtab website concept

A responsive multi-page front-end concept for a small web design studio. It uses original CSS artwork and copy, with the Goodtab name as a replaceable placeholder.

## What's included

- Separate Home, Work, Services, About, and Contact pages
- Responsive mobile navigation, scroll-triggered section reveals, scroll-linked project parallax, pointer-reactive hero artwork, a moving ticker, and hover interactions
- Inquiry form wired to a Vercel Function at `api/orders.js`

## Important: connect the form before launch

The included Vercel Function saves inquiries to a Supabase `orders` table and can send an owner notification through Resend. It does not connect to the existing Lovable database or Resend account, because those credentials and the old project source were not accessible. You need a Supabase project and to add these environment variables to Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never put it in front-end code)
- `RESEND_API_KEY`
- `ORDER_NOTIFICATION_EMAIL` (for example, `liamjeromefernandes@gmail.com`)
- `RESEND_FROM` (optional; defaults to `onboarding@resend.dev`)

Run `supabase-orders.sql` in the Supabase SQL editor to create the storage table. Without a verified sending domain, Resend may limit test messages to the verified account owner address. Customer confirmation emails are not enabled.

To publish, import this folder as a Vercel project, configure the environment variables above, then deploy. Resend still needs an allowed sender address; without a verified domain, live customer email confirmations may not be available.

## Replace before publishing

- Confirm or replace the Goodtab placeholder name
- Replace the three illustrative project concepts with real work and client-approved images
- Review package names, details, and price
- Connect and verify the order endpoint
