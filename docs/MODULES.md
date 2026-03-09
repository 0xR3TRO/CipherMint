# CipherMint — Module Documentation

## Architecture Overview

CipherMint is built as a single-page application using vanilla HTML, CSS, and JavaScript with no external dependencies. The JavaScript logic is organized into self-contained IIFE modules.

---

## Module Map

```
script.js
├── CHARSETS & WORDLIST      — Static data (character sets, word list)
├── PasswordGenerator        — Core generation logic
├── StrengthAnalyzer         — Password strength scoring
├── SmartSuggestions         — Improvement recommendations
├── StorageManager           — localStorage CRUD wrapper
├── ToastManager             — Notification toasts
├── ThemeManager             — Dark/light theme toggling
└── UIController             — DOM orchestration & event binding
```

---

## 1. CHARSETS & WORDLIST

| Constant             | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `CHARSETS.lower`     | `a-z` (26 chars)                                            |
| `CHARSETS.upper`     | `A-Z` (26 chars)                                            |
| `CHARSETS.digits`    | `0-9` (10 chars)                                            |
| `CHARSETS.symbols`   | Common special characters (29 chars)                        |
| `CHARSETS.similar`   | Visually similar chars excluded by "Exclude similar" option |
| `CHARSETS.ambiguous` | Brackets/delimiters excluded by "Easy to read" option       |
| `WORDLIST`           | 600 common English words used for passphrase generation     |

---

## 2. PasswordGenerator

IIFE module exposing four factory methods:

| Method                     | Params                                                                          | Returns                                         |
| -------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------- |
| `generatePassword(opts)`   | `{ length, lower, upper, digits, symbols, excludeSimilar, noRepeat, easyRead }` | `string` — random password                      |
| `generatePassphrase(opts)` | `{ words, separator, style, addNumber, addSymbol }`                             | `string` — word-based passphrase                |
| `generatePIN(opts)`        | `{ length, noRepeat, noSequential }`                                            | `string` — numeric PIN                          |
| `generateAPIKey(opts)`     | `{ segments, segLength, charset }`                                              | `string` — API key (e.g. `AXBF-9K2L-MN0P-QRS4`) |

All randomness uses `crypto.getRandomValues()` for cryptographic security.

---

## 3. StrengthAnalyzer

| Method              | Returns                                              |
| ------------------- | ---------------------------------------------------- |
| `analyze(password)` | `{ score, label, level, percent, entropy, details }` |

Scoring factors (0–100):

- **Length** — up to 30 pts
- **Entropy** — up to 30 pts (based on pool size × length)
- **Character diversity** — up to 25 pts (lower, upper, digits, symbols)
- **Uniqueness ratio** — up to 15 pts

Penalties: repeated characters (−10), sequential patterns (−10), common passwords (−30), very short (−15).

Levels: `weak` → `fair` → `good` → `strong` → `ultra`.

---

## 4. SmartSuggestions

| Method              | Returns                              |
| ------------------- | ------------------------------------ |
| `suggest(analysis)` | `string[]` — list of actionable tips |

Examples: "Increase length to 12+", "Add symbols", "Avoid sequential patterns".

---

## 5. StorageManager

Wraps `localStorage` with JSON serialization and safe error handling.

| Area      | Methods                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| Theme     | `getTheme()`, `setTheme(t)`                                                         |
| Settings  | `getSettings()`, `setSettings(s)`, `resetSettings()`                                |
| History   | `getHistory()`, `addHistory(entry)`, `clearHistory()`                               |
| Favorites | `getFavorites()`, `addFavorite(entry)`, `removeFavorite(value)`, `clearFavorites()` |

History and favorites are capped at 100 entries (FIFO).

---

## 6. ToastManager

| Method                          | Params                                                                   |
| ------------------------------- | ------------------------------------------------------------------------ |
| `show(message, type, duration)` | `type`: `"success"`, `"error"`, `"info"` · `duration`: ms (default 2500) |

Toasts auto-dismiss with CSS animation.

---

## 7. ThemeManager

| Method         | Description                                        |
| -------------- | -------------------------------------------------- |
| `init()`       | Reads saved theme from localStorage and applies it |
| `toggle()`     | Switches between dark ↔ light and persists         |
| `apply(theme)` | Sets `data-theme` attribute on `<html>`            |

---

## 8. UIController

Orchestrates all DOM interactions:

- **Mode switching** — tabs for Password / Passphrase / PIN / API Key
- **Generate** — reads current mode's options, calls generator, updates output
- **Strength display** — real-time strength bar + label + entropy
- **Copy** — Clipboard API with fallback
- **Panels** — slide-over panels for History, Favorites, Settings
- **Presets** — Ultra Secure, Memorable, Numeric
- **Analyzer** — standalone password analysis form
- **Keyboard shortcut** — `Ctrl/Cmd + G` to generate
- **Export** — download history as `.txt`
- **Sound** — Web Audio API click sound (optional)

---

## CSS Architecture (styles.css)

- **CSS custom properties** for theming (dark/light)
- **Glassmorphism** — `backdrop-filter: blur()` on cards and header
- **Responsive** — mobile-first with breakpoints at 640px and 380px
- **Animations** — `fadeIn`, `fadeInUp`, `pulse`, `shake`, `toastIn/Out`
- **Accessibility** — `:focus-visible` outlines, `prefers-reduced-motion`, ARIA attributes, `.sr-only` utility
