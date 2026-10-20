# Handover from Surf Pacific — checklist

Contact: Lachlan (Surf Pacific). Status as at 20 Oct 2026: **all items outstanding**.

Tick each item when received. Store credentials in a password manager, never in this repo.

## Contract
- [ ] Hosting/maintenance cancellation date confirmed in writing
- [ ] Final invoice amount and date
- [ ] Any notice period or exit fees

## Domain and DNS
- [ ] Domain registrar name for `katridout.com.au` (and `.com` if held)
- [ ] Registrar login transferred to Anthony, or domain pushed to Anthony's own registrar/Cloudflare account
- [ ] auDA registrant contact = Katrina / Blooming Pty Ltd (check ABN on the record)
- [ ] Full DNS zone export (all A, CNAME, MX, TXT, SRV records)
- [ ] Who currently hosts DNS

## Email
- [ ] Where `info@katridout.com.au` mailbox is hosted (Google Workspace / Microsoft 365 / cPanel / other)
- [ ] Admin login for that mail service
- [ ] SPF, DKIM, DMARC records in use
- [ ] Any other mailboxes or forwarders on the domain

## WordPress
- [ ] Full site backup: database `.sql` + complete `wp-content/` (themes, plugins, **uploads** — 392 media files still to download)
- [ ] WordPress admin login (Administrator role) for Anthony
- [ ] Hosting control panel login (cPanel / Plesk / WP Engine / other) + SFTP
- [ ] List of paid plugin or theme licences and whether they transfer
- [ ] Any custom code, child theme or deploy pipeline — and where it lives

## Front end
- [ ] Any Git repo(s) for the headless front end — transfer ownership to Anthony's GitHub
- [ ] Hosting account for the front end (Vercel / Netlify / other) — transfer or export
- [ ] Any CDN, image service or third-party API keys the site uses

## Google and analytics
- [ ] Google Search Console: Anthony added as **Owner** on both `katridout.com.au` and `api.katridout.com.au` properties
- [ ] GA4 property: Anthony as Administrator
- [ ] GTM container `GTM-NVQZKHL`: Anthony as Admin with publish rights
- [ ] Google Business Profile: confirm Anthony/Katrina are Primary owner
- [ ] Any Google Ads, Bing Webmaster or other accounts Surf Pacific created on KRN's behalf

## Other
- [ ] Any services billed to Surf Pacific on KRN's behalf (fonts, stock images, forms, SSL)
- [ ] Documentation they hold (site map, content inventory, brand files)
- [ ] Confirmation that Surf Pacific access to all of the above is removed after transfer

## Email template

Subject: `katridout.com.au — handover items`

> Hi Lachlan,
>
> We're bringing the Katrina Ridout Nutrition site in-house. Could you send through the following so we can close this out cleanly:
>
> 1. Hosting cancellation date and final invoice.
> 2. Domain registrar for katridout.com.au and the login (or push the domain to our account), plus a full DNS zone export.
> 3. Where info@katridout.com.au is hosted and the admin login.
> 4. Full WordPress backup — database plus the complete wp-content folder including uploads — and an Administrator login plus hosting/SFTP access.
> 5. Any Git repos or hosting accounts for the front end, transferred to anthonyridout77@gmail.com on GitHub.
> 6. Owner access for anthonyridout77@gmail.com on Google Search Console, GA4 and GTM (GTM-NVQZKHL).
> 7. Any licences, keys or third-party services tied to the site.
>
> Happy to jump on a quick call if easier. Thanks for your help with the site to date.
>
> Anthony Ridout
> +61 407 965 960
