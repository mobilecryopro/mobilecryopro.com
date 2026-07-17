# Mobile Cryo Pro

Production website for [Mobile Cryo Pro](https://mobilecryopro.com/), a mobile localized-cryotherapy service covering Sonoma, Marin, and the wider North Bay.

The site is static HTML, CSS, and JavaScript and is deployed with GitHub Pages. Website inquiries are handled through Formspree, and confirmed customers can pay a reusable $50 booking deposit through Stripe.

## Local preview

Serve the repository root with any static HTTP server, for example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Production services

- Hosting: GitHub Pages
- Forms: Formspree
- Booking deposit: Stripe Payment Links
- Custom domain: `mobilecryopro.com`

Do not commit client credentials, account recovery codes, private correspondence, or unapproved customer media.
