# CipherMint 🔐

**Modern, secure password generator — 100% client-side, zero dependencies.**

CipherMint is a professional-grade password generation tool that runs entirely in your browser. No servers, no tracking, no frameworks — just pure HTML, CSS, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-green) ![Offline](https://img.shields.io/badge/works-offline-blue) ![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)

---

## Features

### Password Generator

- Configurable length (4–128 characters)
- Character sets: lowercase, uppercase, digits, symbols
- Exclude visually similar characters (`i`, `l`, `1`, `L`, `o`, `0`, `O`)
- No repeated characters option
- "Easy to read" mode (no ambiguous brackets/delimiters)
- Presets: **Ultra Secure**, **Memorable**, **Numeric**
- Generate multiple passwords at once (up to 50)

### Passphrase Generator

- Word-based passphrases from a 600-word curated list
- Custom separator (hyphen, space, dot, underscore, slash)
- Word style: lowercase, TitleCase, UPPERCASE
- Optional appended number and/or symbol

### PIN Generator

- Configurable length (3–12 digits)
- No repeated digits option
- No sequential digits option

### API Key Generator

- Configurable segment count and length
- Character sets: alphanumeric, hexadecimal, alphabetic
- Standard format: `XXXX-XXXX-XXXX-XXXX`

### Password Strength Analyzer

- Real-time scoring (0–100)
- Entropy calculation (bits)
- Pattern & sequence detection
- Common password detection
- Visual strength bar with color coding

### Smart Suggestions

- Actionable tips to improve any password
- Context-aware recommendations based on analysis

### UI & UX

- Dark and light themes (saved in `localStorage`)
- Glassmorphism design with smooth animations
- Fully responsive (mobile-first)
- Toast notifications
- Keyboard shortcut: `Ctrl/Cmd + G` to generate
- ARIA attributes and focus-visible outlines for accessibility
- Reduced motion support

### Data Management

- Password history (up to 100 entries, `localStorage`)
- Favorites with quick copy
- Export history as `.txt`
- Settings panel with auto-copy, sound effects toggles
- Reset all settings

---

## Repository Structure

```
CipherMint/
├── index.html              # Main application
├── styles.css              # Application styles (glassmorphism, themes)
├── script.js               # Application logic (modular IIFE architecture)
├── README.md               # This file
│
├── assets/
│   ├── icons/
│   │   ├── favicon.svg     # App favicon
│   │   ├── logo.svg        # Full logo
│   │   └── shield.svg      # Security icon
│   ├── images/             # Graphics placeholder
│   └── sounds/             # Sound files placeholder (Web Audio API used)
│
├── docs/
│   └── MODULES.md          # Detailed module documentation
│
└── landing/
    ├── index.html           # Landing/presentation page
    ├── landing.css          # Landing page styles
    └── landing.js           # Mini password generator preview
```

---

## Getting Started

### Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/0xR3TRO/CipherMint.git
    cd CipherMint
    ```

2. Open `index.html` in your browser:
    ```bash
    open index.html
    # or on Linux:
    xdg-open index.html
    ```

No build step. No `npm install`. No server required.

### Or use a local server (optional):

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Modules

The JavaScript codebase is organized into self-contained IIFE modules inside `script.js`:

| Module                  | Responsibility                                          |
| ----------------------- | ------------------------------------------------------- |
| **CHARSETS & WORDLIST** | Static character sets and word list data                |
| **PasswordGenerator**   | Core generation: passwords, passphrases, PINs, API keys |
| **StrengthAnalyzer**    | Scoring engine: entropy, diversity, pattern detection   |
| **SmartSuggestions**    | AI-like improvement tips based on analysis              |
| **StorageManager**      | `localStorage` CRUD for settings, history, favorites    |
| **ToastManager**        | Non-blocking notification toasts                        |
| **ThemeManager**        | Dark/light theme persistence                            |
| **UIController**        | DOM orchestration, events, rendering                    |

See [docs/MODULES.md](docs/MODULES.md) for detailed documentation.

---

## Security Notes

- **All generation uses `crypto.getRandomValues()`** — cryptographically secure pseudorandom number generator (CSPRNG).
- **Zero network requests** — the app never contacts any server. All data stays in your browser's `localStorage`.
- **No third-party dependencies** — no supply-chain risk.
- **No analytics or tracking** of any kind.
- **Password history is stored locally** — clear it anytime from the History panel or browser settings.
- This tool **does not replace a password manager** — use it to generate passwords, then store them securely in a dedicated manager (Bitwarden, 1Password, KeePass, etc.).

---

## Landing Page

The `/landing` directory contains a standalone presentation page with:

- **Hero** — CipherMint branding, tagline, and call-to-action
- **Features** — icon grid highlighting all capabilities
- **Interactive Preview** — mini password generator you can try immediately
- **"Why Security Matters"** — statistics about credential breaches
- **CTA** — direct link to the main application
- **Footer** — branding and privacy assurance

Open `landing/index.html` to view.

---

## Future Improvements

- [ ] **Progressive Web App (PWA)** — offline mode with service worker + install prompt
- [ ] **Entropy visualization** — animated bit-level entropy display
- [ ] **Image-based password generation** — derive seeds from user-uploaded images
- [ ] **Password manager integration** — export to Bitwarden/KeePass formats
- [ ] **Multi-language support** — i18n for the UI
- [ ] **Pronounceable passwords** — phonetically memorable generation mode
- [ ] **Password breach check** — k-anonymity check against Have I Been Pwned API
- [ ] **Browser extension** — Chrome/Firefox extension with auto-fill
- [ ] **Custom word lists** — user-uploaded word lists for passphrases
- [ ] **QR code export** — generate QR codes for sharing passwords securely

---

## License

MIT © 2026 [0xR3TRO](https://github.com/0xR3TRO)
