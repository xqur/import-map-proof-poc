# Import Map Override — Proof of Concept

A **harmless** security research proof-of-concept artifact demonstrating
external JavaScript execution via import map override.

> ⚠️ **Intended use only:** Authorized bug bounty reporting and
> controlled security demonstrations. **Not** for use against any
> system without explicit permission.

## Repository Structure

```
/
├── index.html    — Landing page explaining the PoC
├── proof.js      — Harmless proof-of-execution JavaScript file
└── README.md     — This file
```

## What proof.js Does

When loaded by a browser, `proof.js` performs only:

1. Logs a green-tinted console message:
   ```
   [PoC] Import map override proof: external JavaScript executed successfully
   ```
2. Shows a browser alert dialog:
   ```
   PoC successful: external JavaScript module executed
   ```

**It does NOT:**
- Collect or exfiltrate cookies, credentials, or any user data
- Make any HTTP, fetch, XHR, or WebSocket requests
- Access `document.cookie`, `localStorage`, `sessionStorage`, or `indexedDB`
- Modify the DOM, redirect, or interact with the page content
- Load any additional scripts or resources
- Perform any malicious, harmful, or destructive operations

## Verification Steps

### Step 1: Access the proof.js file directly

Open in browser:

```
https://xqur.github.io/import-map-proof-poc/proof.js
```

Expected: The raw JavaScript source code is displayed (browser-dependent).

### Step 2: Verify via browser console

```js
var s = document.createElement('script');
s.src = 'https://xqur.github.io/import-map-proof-poc/proof.js';
document.head.appendChild(s);
```

Expected outcomes:
- Browser console shows: *"Import map override proof: external JavaScript executed successfully"*
- Browser alert dialog shows: *"PoC successful: external JavaScript module executed"*

### Step 3: Check HTTP response

```bash
curl -sI https://xqur.github.io/import-map-proof-poc/proof.js
```

Expected: HTTP 200 with `Content-Type: application/javascript` or `text/plain`.

## Usage in Bug Bounty Reports

When reporting an import map override vulnerability, reference this
file as the proof URL in your report:

```
Proof URL: https://xqur.github.io/import-map-proof-poc/proof.js
```

## Security Considerations

- This repository contains **zero** malicious code
- All code is intentionally harmless and non-invasive
- No tracking, analytics, or logging is built into these files
- The PoC is self-contained with no external dependencies

## License

This project is provided for educational and authorized security testing
purposes only. Use responsibly.
