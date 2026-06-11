# Amazon Referral Tag - Chrome Extension

A minimal Chrome extension that automatically applies an Amazon Associates referral tag to every Amazon page you visit.

## How it works

When you navigate to any Amazon page, the extension silently adds `?tag=fordham-20` to the URL. No clicks, no setup, no visible changes.

## Installation

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder

## Customization

To change the referral tag, edit the `value` field in `rules.json`:

```json
{ "key": "tag", "value": "your-tag-here" }
```

Then reload the extension in `chrome://extensions`.
