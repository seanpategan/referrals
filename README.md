# Amazon Referral PWA

A lightweight web app that lets you search Amazon with your referral tag automatically applied. Pin it to your phone's homescreen for instant access.

## How it works

Type a search query, hit enter, and you land on Amazon's results page with your Associates tag already in the URL.

**Demo mode** prompts for a referral tag on first visit and remembers it. **Company mode** has the tag hardcoded — no prompt, just search.

## Files

- **`index.html`** — the entire app. Edit the `CONFIG` block at the top to switch between demo and company mode, set your referral tag, and customize branding.
- **`manifest.json`** — enables "Add to Home Screen" on iOS and Android so the app opens like a native app.
- **`icon.svg`** — the homescreen icon.

## Creating a company build

In `index.html`, update the config at the top:

```js
const CONFIG = {
  demo: false,           // removes the setup popup
  referralTag: "yourtag-20",
  companyName: "Acme Shop",
  primaryColor: "#FF9900"
};
```

Then host the three files anywhere (GitHub Pages, Netlify, etc.).
