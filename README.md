# TeqXus

**Offline-capable AI assistant + document reader.**  
Built by Teq Vault LLC · [teqxus.app](https://teqxus.app)

> Chat in your language. Read and edit Markdown, Word, and PDF. Works on slow connections — and offline.

## What’s shipping

| Surface | What it does |
|---|---|
| **TeqXus AI** (`/`) | Lightweight chat PWA — Claude / Llama / Qwen, 7 languages, offline queue, device-local history |
| **TeqDocs** (`/teqdocs/`) | Full document reader & editor — MD, DOCX, PDF, highlights, bookmarks, focus mode + ambient sounds |
| **Guides** (`/guides/`) | Offline-friendly how-tos |

### Unified shell
Bottom tabs: **Chat · Docs · History · Settings**. Docs opens TeqDocs on the same origin.

### Reading → Chat bridge
Highlight text in TeqDocs → **Ask TeqXus** → opens chat with that passage as context.

### Focus mode + ambient
In TeqDocs, enable Focus (Ctrl+Shift+F) and pick Lo-fi / Rain / Forest / Ocean / Noise.

### First-run onboarding
Short 3-step intro (value → language → Docs + bridge). Stored in `localStorage`.

## Stack (current PWA)

- Vanilla HTML / CSS / JS (no framework on the public shell)
- Service worker for offline caching of shell + guides + TeqDocs
- Backend for AI: Render (`teqxus-backend`)
- Optional Pro via Stripe

## Local preview

Serve the `TeqXus_ai` folder as static files (any static host or `npx serve`).

```bash
npx serve .
# open http://localhost:3000
```

## Design system (Juice)

- Navy base: `#070e1a`
- Accent teal: `#3EE8C5`
- Glass bars, soft glows, grain overlay, micro-animations

TeqDocs also ships a classic parchment theme (toggle in-app).

---

**TeqXus** · Teq Vault LLC · teqxus.app
