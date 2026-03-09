/**
 * CipherMint — Secure Password Generator
 * Pure vanilla JS, zero dependencies, 100% client-side.
 *
 * Modules:
 *  1. CHARSETS & WORDLIST
 *  2. PasswordGenerator
 *  3. StrengthAnalyzer
 *  4. SmartSuggestions
 *  5. StorageManager  (localStorage wrapper)
 *  6. ToastManager
 *  7. ThemeManager
 *  8. UIController    (DOM orchestration)
 */

"use strict";

/* ================================================
   1. CHARSETS & WORDLIST
   ================================================ */
const CHARSETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?/~`",
    similar: "ilI1LoO0",
    ambiguous: "{}[]()/\\'\"`~,;:.<>",
};

// Compact word list for passphrase generation (600 common English words)
const WORDLIST = [
    "apple",
    "brave",
    "cloud",
    "dance",
    "eagle",
    "flame",
    "grape",
    "house",
    "ivory",
    "jewel",
    "knock",
    "lemon",
    "magic",
    "noble",
    "ocean",
    "piano",
    "queen",
    "river",
    "storm",
    "tiger",
    "ultra",
    "vivid",
    "whale",
    "xenon",
    "yacht",
    "zebra",
    "amber",
    "blaze",
    "candy",
    "delta",
    "ember",
    "frost",
    "globe",
    "haven",
    "index",
    "joker",
    "karma",
    "lunar",
    "metro",
    "nexus",
    "oasis",
    "pearl",
    "quilt",
    "radar",
    "solar",
    "trend",
    "unity",
    "vault",
    "wrist",
    "pixel",
    "arena",
    "beach",
    "cedar",
    "daisy",
    "epoch",
    "forge",
    "ghost",
    "humor",
    "input",
    "juice",
    "kayak",
    "laser",
    "maple",
    "nerve",
    "orbit",
    "prism",
    "quest",
    "robin",
    "sigma",
    "torch",
    "urban",
    "vigor",
    "wheat",
    "xerox",
    "youth",
    "zesty",
    "alert",
    "brook",
    "charm",
    "drift",
    "elbow",
    "fable",
    "gamma",
    "hedge",
    "irony",
    "jumbo",
    "kneel",
    "lotus",
    "mocha",
    "north",
    "omega",
    "plume",
    "quote",
    "reign",
    "suite",
    "trail",
    "usher",
    "venue",
    "witty",
    "axiom",
    "basin",
    "cider",
    "dodge",
    "exile",
    "flora",
    "glide",
    "haste",
    "ivory",
    "jazzy",
    "kiosk",
    "lyric",
    "mango",
    "niche",
    "olive",
    "panda",
    "quake",
    "ridge",
    "spice",
    "tunic",
    "umbra",
    "venom",
    "woven",
    "oxide",
    "yield",
    "zonal",
    "abyss",
    "badge",
    "camel",
    "decoy",
    "entry",
    "fairy",
    "guard",
    "hoist",
    "ideal",
    "jolly",
    "kebab",
    "liver",
    "mouse",
    "novel",
    "optic",
    "patch",
    "quirk",
    "rusty",
    "shade",
    "thumb",
    "unify",
    "valve",
    "waltz",
    "xylem",
    "yeast",
    "zippy",
    "acorn",
    "bliss",
    "crane",
    "dwarf",
    "erupt",
    "finder",
    "giant",
    "happy",
    "image",
    "minor",
    "money",
    "never",
    "order",
    "power",
    "rapid",
    "saint",
    "table",
    "under",
    "voice",
    "woman",
    "world",
    "event",
    "angle",
    "blank",
    "cliff",
    "dream",
    "equal",
    "flash",
    "green",
    "horse",
    "inner",
    "joint",
    "knife",
    "light",
    "metal",
    "night",
    "other",
    "plant",
    "quiet",
    "round",
    "sharp",
    "thick",
    "upper",
    "virus",
    "water",
    "young",
    "audio",
    "boost",
    "chief",
    "depth",
    "exact",
    "field",
    "grasp",
    "heavy",
    "issue",
    "judge",
    "known",
    "level",
    "model",
    "noted",
    "offer",
    "prime",
    "stone",
    "tower",
    "usual",
    "waste",
    "bonus",
    "cable",
    "donor",
    "error",
    "focus",
    "grain",
    "honey",
    "ivory",
    "jewel",
    "knack",
    "lever",
    "minor",
    "novel",
    "outer",
    "phase",
    "ratio",
    "solid",
    "trend",
    "unite",
    "verse",
    "worth",
    "yield",
    "agent",
    "brick",
    "color",
    "demon",
    "eight",
    "frame",
    "grand",
    "hotel",
    "intro",
    "joust",
    "kite",
    "lunar",
    "mount",
    "nerve",
    "omega",
    "prove",
    "quest",
    "relay",
    "sweep",
    "token",
    "utter",
    "vinyl",
    "windy",
    "youth",
    "azure",
    "brave",
    "chill",
    "doubt",
    "early",
    "faith",
    "glory",
    "haven",
    "iron",
    "joint",
    "karma",
    "limit",
    "marsh",
    "noble",
    "orbit",
    "pause",
    "quail",
    "range",
    "scale",
    "trace",
    "urban",
    "value",
    "whisk",
    "yonder",
    "zero",
    "adapt",
    "blend",
    "coral",
    "denim",
    "evoke",
    "flint",
    "gusto",
    "hazel",
    "ivory",
    "joker",
    "karma",
    "llama",
    "mural",
    "north",
    "ozone",
    "plumb",
    "quasi",
    "royal",
    "swirl",
    "topaz",
    "ultra",
    "vivid",
    "wedge",
    "zinc",
    "annex",
    "brisk",
    "clasp",
    "disco",
    "emery",
    "frost",
    "glyph",
    "hyper",
    "icing",
    "juicy",
    "knelt",
    "lunar",
    "melon",
    "nudge",
    "onion",
    "plush",
    "quill",
    "ranch",
    "stern",
    "tulip",
    "umbra",
    "vigor",
    "waver",
    "xenon",
    "yacht",
    "zephyr",
    "altar",
    "bison",
    "cedar",
    "dodge",
    "ether",
    "forge",
    "grill",
    "helix",
    "index",
    "jewel",
    "kelp",
    "latch",
    "mirth",
    "nexus",
    "oasis",
    "pixel",
    "quilt",
    "rover",
    "stump",
    "tidal",
    "usher",
    "valet",
    "whelk",
    "oxide",
    "yucca",
    "zebra",
    "aqua",
    "bass",
    "chef",
    "dusk",
    "echo",
    "fern",
    "gaze",
    "haze",
    "isle",
    "jest",
    "keen",
    "lure",
    "maze",
    "nest",
    "oath",
    "pave",
    "raft",
    "sage",
    "tame",
    "urge",
    "veil",
    "wade",
    "yawn",
    "zeal",
    "arch",
    "bolt",
    "cite",
    "dome",
    "ease",
    "fell",
    "glow",
    "helm",
    "inch",
    "jury",
    "keel",
    "lime",
    "mole",
    "navy",
    "omen",
    "peel",
    "rack",
    "slab",
    "tier",
    "vane",
    "whip",
    "zinc",
    "axis",
    "bump",
    "cope",
    "dose",
    "edge",
    "flex",
    "gear",
    "hint",
    "jade",
    "kelp",
    "lobe",
    "mend",
    "null",
    "opus",
    "plow",
    "ramp",
    "silk",
    "tray",
    "upon",
    "vibe",
    "weld",
    "yarn",
    "apex",
    "bulk",
    "clue",
    "dune",
    "envy",
    "fiji",
    "gulp",
    "herd",
    "idol",
    "jolt",
    "kiwi",
    "lawn",
    "mesa",
    "neon",
    "oval",
    "pulp",
    "reef",
    "sync",
    "tusk",
    "urns",
    "volt",
    "wick",
    "yogi",
    "zest",
    "aide",
    "bowl",
    "cube",
    "dial",
    "epic",
    "fold",
    "grit",
    "hurl",
    "iota",
    "jinx",
    "knob",
    "loft",
    "myth",
    "node",
    "owls",
    "pine",
    "ruin",
    "sway",
    "twig",
    "unit",
    "vise",
    "wren",
    "yell",
    "zoom",
];

/* ================================================
   2. PASSWORD GENERATOR
   ================================================ */
const PasswordGenerator = (() => {
    /** Crypto-safe random integer in [0, max) */
    function randomInt(max) {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        return arr[0] % max;
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = randomInt(i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /** Build character pool based on options */
    function buildPool(opts) {
        let pool = "";
        if (opts.lower) pool += CHARSETS.lower;
        if (opts.upper) pool += CHARSETS.upper;
        if (opts.digits) pool += CHARSETS.digits;
        if (opts.symbols) pool += CHARSETS.symbols;
        if (opts.excludeSimilar) {
            pool = pool
                .split("")
                .filter((c) => !CHARSETS.similar.includes(c))
                .join("");
        }
        if (opts.easyRead) {
            pool = pool
                .split("")
                .filter(
                    (c) =>
                        !CHARSETS.ambiguous.includes(c) &&
                        !CHARSETS.similar.includes(c),
                )
                .join("");
        }
        return pool;
    }

    /** Generate a single password string */
    function generatePassword(opts) {
        const pool = buildPool(opts);
        if (!pool.length) return "";
        const len = opts.length || 16;

        if (opts.noRepeat && len > pool.length) {
            // Can't satisfy no-repeat if length exceeds pool size
            return shuffleArray(pool.split("")).slice(0, pool.length).join("");
        }

        const chars = [];
        const used = new Set();

        // Guarantee at least one char from each selected set
        const guaranteeSets = [];
        if (opts.lower) guaranteeSets.push(filterPool(CHARSETS.lower, opts));
        if (opts.upper) guaranteeSets.push(filterPool(CHARSETS.upper, opts));
        if (opts.digits) guaranteeSets.push(filterPool(CHARSETS.digits, opts));
        if (opts.symbols)
            guaranteeSets.push(filterPool(CHARSETS.symbols, opts));

        for (const set of guaranteeSets) {
            if (!set.length) continue;
            let c;
            do {
                c = set[randomInt(set.length)];
            } while (opts.noRepeat && used.has(c));
            chars.push(c);
            used.add(c);
        }

        // Fill remaining
        while (chars.length < len) {
            const c = pool[randomInt(pool.length)];
            if (opts.noRepeat && used.has(c)) continue;
            chars.push(c);
            used.add(c);
        }

        return shuffleArray(chars).join("");
    }

    function filterPool(charset, opts) {
        let arr = charset.split("");
        if (opts.excludeSimilar)
            arr = arr.filter((c) => !CHARSETS.similar.includes(c));
        if (opts.easyRead)
            arr = arr.filter(
                (c) =>
                    !CHARSETS.ambiguous.includes(c) &&
                    !CHARSETS.similar.includes(c),
            );
        return arr;
    }

    /** Generate passphrase */
    function generatePassphrase(opts) {
        const count = opts.words || 4;
        const sep = opts.separator ?? "-";
        const style = opts.style || "lowercase";

        const words = [];
        const usedIdx = new Set();
        for (let i = 0; i < count; i++) {
            let idx;
            do {
                idx = randomInt(WORDLIST.length);
            } while (usedIdx.has(idx));
            usedIdx.add(idx);
            let w = WORDLIST[idx];
            if (style === "titlecase") w = w[0].toUpperCase() + w.slice(1);
            else if (style === "uppercase") w = w.toUpperCase();
            words.push(w);
        }

        let result = words.join(sep);
        if (opts.addNumber) result += sep + randomInt(100);
        if (opts.addSymbol) result += "!@#$%&*"[randomInt(7)];
        return result;
    }

    /** Generate PIN */
    function generatePIN(opts) {
        const len = opts.length || 4;
        const digits = "0123456789";
        const chars = [];
        const used = new Set();

        while (chars.length < len) {
            const d = digits[randomInt(10)];
            if (opts.noRepeat && used.has(d)) continue;
            if (opts.noSequential && chars.length > 0) {
                const prev = parseInt(chars[chars.length - 1], 10);
                const curr = parseInt(d, 10);
                if (Math.abs(curr - prev) === 1) continue;
            }
            chars.push(d);
            used.add(d);
        }
        return chars.join("");
    }

    /** Generate API Key (e.g. XXXX-XXXX-XXXX-XXXX) */
    function generateAPIKey(opts) {
        const segments = opts.segments || 4;
        const segLen = opts.segLength || 4;
        let pool;
        switch (opts.charset) {
            case "hex":
                pool = "0123456789ABCDEF";
                break;
            case "alpha":
                pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;
            default:
                pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        const parts = [];
        for (let s = 0; s < segments; s++) {
            let seg = "";
            for (let i = 0; i < segLen; i++) {
                seg += pool[randomInt(pool.length)];
            }
            parts.push(seg);
        }
        return parts.join("-");
    }

    return {
        generatePassword,
        generatePassphrase,
        generatePIN,
        generateAPIKey,
    };
})();

/* ================================================
   3. STRENGTH ANALYZER
   ================================================ */
const StrengthAnalyzer = (() => {
    function analyze(password) {
        if (!password || password === "Click Generate") {
            return {
                score: 0,
                label: "—",
                percent: 0,
                entropy: 0,
                details: {},
            };
        }

        const len = password.length;
        let poolSize = 0;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSymbol = /[^a-zA-Z0-9]/.test(password);
        const uniqueChars = new Set(password).size;

        if (hasLower) poolSize += 26;
        if (hasUpper) poolSize += 26;
        if (hasDigit) poolSize += 10;
        if (hasSymbol) poolSize += 32;

        const entropy = poolSize > 0 ? len * Math.log2(poolSize) : 0;

        // Check patterns
        const hasRepeat = /(.)\1{2,}/.test(password);
        const hasSequence =
            /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
                password,
            );
        const hasCommon =
            /^(password|123456|qwerty|admin|letmein|welcome|monkey|dragon)/i.test(
                password,
            );

        // Score (0-100)
        let score = 0;
        score += Math.min(len * 3, 30); // length (max 30)
        score += Math.min(entropy / 2, 30); // entropy (max 30)
        score +=
            (hasLower ? 5 : 0) +
            (hasUpper ? 5 : 0) +
            (hasDigit ? 5 : 0) +
            (hasSymbol ? 10 : 0); // diversity (max 25)
        score += Math.min((uniqueChars / len) * 15, 15); // uniqueness (max 15)

        // Penalties
        if (hasRepeat) score -= 10;
        if (hasSequence) score -= 10;
        if (hasCommon) score -= 30;
        if (len < 6) score -= 15;

        score = Math.max(0, Math.min(100, Math.round(score)));

        let label, level;
        if (score < 20) {
            label = "Very Weak";
            level = "weak";
        } else if (score < 40) {
            label = "Weak";
            level = "weak";
        } else if (score < 60) {
            label = "Fair";
            level = "fair";
        } else if (score < 80) {
            label = "Good";
            level = "good";
        } else if (score < 95) {
            label = "Strong";
            level = "strong";
        } else {
            label = "Ultra Secure";
            level = "ultra";
        }

        return {
            score,
            label,
            level,
            percent: score,
            entropy: Math.round(entropy * 10) / 10,
            details: {
                length: len,
                hasLower,
                hasUpper,
                hasDigit,
                hasSymbol,
                uniqueChars,
                poolSize,
                hasRepeat,
                hasSequence,
                hasCommon,
            },
        };
    }

    return { analyze };
})();

/* ================================================
   4. SMART SUGGESTIONS
   ================================================ */
const SmartSuggestions = (() => {
    function suggest(analysis) {
        const tips = [];
        const d = analysis.details;
        if (!d || !d.length) return tips;

        if (d.length < 12) tips.push("Increase length to 12+");
        if (d.length < 16 && analysis.score < 80)
            tips.push("Use 16+ characters");
        if (!d.hasSymbol) tips.push("Add symbols (!@#…)");
        if (!d.hasUpper) tips.push("Add uppercase letters");
        if (!d.hasLower) tips.push("Add lowercase letters");
        if (!d.hasDigit) tips.push("Add digits");
        if (d.hasRepeat) tips.push("Avoid repeated characters");
        if (d.hasSequence) tips.push("Avoid sequential patterns");
        if (d.hasCommon) tips.push("Avoid common passwords");
        if (d.uniqueChars < d.length * 0.6)
            tips.push("Use more unique characters");
        return tips;
    }

    return { suggest };
})();

/* ================================================
   5. STORAGE MANAGER
   ================================================ */
const StorageManager = (() => {
    const KEYS = {
        theme: "cm_theme",
        settings: "cm_settings",
        history: "cm_history",
        favorites: "cm_favorites",
    };

    function get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    }

    function set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch {
            /* quota */
        }
    }

    function remove(key) {
        try {
            localStorage.removeItem(key);
        } catch {
            /* ignore */
        }
    }

    // Theme
    function getTheme() {
        return get(KEYS.theme, "dark");
    }
    function setTheme(t) {
        set(KEYS.theme, t);
    }

    // Settings
    const DEFAULT_SETTINGS = {
        autoCopy: false,
        saveHistory: true,
        sound: false,
    };
    function getSettings() {
        return { ...DEFAULT_SETTINGS, ...get(KEYS.settings, {}) };
    }
    function setSettings(s) {
        set(KEYS.settings, s);
    }
    function resetSettings() {
        remove(KEYS.settings);
    }

    // History (max 100)
    function getHistory() {
        return get(KEYS.history, []);
    }
    function addHistory(entry) {
        const h = getHistory();
        h.unshift({ value: entry, time: Date.now() });
        if (h.length > 100) h.length = 100;
        set(KEYS.history, h);
    }
    function clearHistory() {
        set(KEYS.history, []);
    }

    // Favorites (max 100)
    function getFavorites() {
        return get(KEYS.favorites, []);
    }
    function addFavorite(entry) {
        const f = getFavorites();
        if (f.some((x) => x.value === entry)) return false;
        f.unshift({ value: entry, time: Date.now() });
        if (f.length > 100) f.length = 100;
        set(KEYS.favorites, f);
        return true;
    }
    function removeFavorite(value) {
        const f = getFavorites().filter((x) => x.value !== value);
        set(KEYS.favorites, f);
    }
    function clearFavorites() {
        set(KEYS.favorites, []);
    }

    return {
        getTheme,
        setTheme,
        getSettings,
        setSettings,
        resetSettings,
        getHistory,
        addHistory,
        clearHistory,
        getFavorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
    };
})();

/* ================================================
   6. TOAST MANAGER
   ================================================ */
const ToastManager = (() => {
    const container = document.getElementById("toast-container");

    function show(msg, type = "success", duration = 2500) {
        const el = document.createElement("div");
        el.className = `toast ${type}`;
        el.textContent = msg;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add("exit");
            el.addEventListener("animationend", () => el.remove());
        }, duration);
    }

    return { show };
})();

/* ================================================
   7. THEME MANAGER
   ================================================ */
const ThemeManager = (() => {
    function apply(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        StorageManager.setTheme(theme);
    }

    function toggle() {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        apply(next);
        return next;
    }

    function init() {
        apply(StorageManager.getTheme());
    }

    return { init, toggle, apply };
})();

/* ================================================
   8. UI CONTROLLER
   ================================================ */
const UI = (() => {
    // DOM references
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    let currentMode = "password";
    let currentPassword = "";

    /* ---- Elements ---- */
    const els = {};

    function cacheElements() {
        els.output = $("#password-output");
        els.strengthBar = $("#strength-bar");
        els.strengthLabel = $("#strength-label");
        els.entropyValue = $("#entropy-value");
        els.suggestions = $("#suggestions");
        els.multiOutput = $("#multi-output");
        els.multiList = $("#multi-list");

        // Password opts
        els.lengthSlider = $("#length-slider");
        els.lengthValue = $("#length-value");
        els.countInput = $("#count-input");
        els.optLower = $("#opt-lower");
        els.optUpper = $("#opt-upper");
        els.optDigits = $("#opt-digits");
        els.optSymbols = $("#opt-symbols");
        els.optExcludeSimilar = $("#opt-exclude-similar");
        els.optNoRepeat = $("#opt-no-repeat");
        els.optEasyRead = $("#opt-easy-read");

        // Passphrase
        els.ppWords = $("#pp-words");
        els.ppWordsValue = $("#pp-words-value");
        els.ppSeparator = $("#pp-separator");
        els.ppStyle = $("#pp-style");
        els.ppAddNumber = $("#pp-add-number");
        els.ppAddSymbol = $("#pp-add-symbol");

        // PIN
        els.pinLength = $("#pin-length");
        els.pinLengthValue = $("#pin-length-value");
        els.pinNoRepeat = $("#pin-no-repeat");
        els.pinNoSequential = $("#pin-no-sequential");

        // API Key
        els.apiSegments = $("#api-segments");
        els.apiSegLength = $("#api-seg-length");
        els.apiCharset = $("#api-charset");

        // Analyzer
        els.analyzerInput = $("#analyzer-input");
        els.analyzerResult = $("#analyzer-result");

        // Panels
        els.historyPanel = $("#history-panel");
        els.historyList = $("#history-list");
        els.favoritesPanel = $("#favorites-panel");
        els.favoritesList = $("#favorites-list");
        els.settingsPanel = $("#settings-panel");
        els.overlay = $("#overlay");

        // Settings toggles
        els.setAutoCopy = $("#set-auto-copy");
        els.setSaveHistory = $("#set-save-history");
        els.setSound = $("#set-sound");
    }

    /* ---- Generate ---- */
    function generate() {
        const count = parseInt(els.countInput.value, 10) || 1;
        let passwords = [];

        for (let i = 0; i < count; i++) {
            let pw;
            switch (currentMode) {
                case "passphrase":
                    pw =
                        PasswordGenerator.generatePassphrase(
                            getPassphraseOpts(),
                        );
                    break;
                case "pin":
                    pw = PasswordGenerator.generatePIN(getPINOpts());
                    break;
                case "apikey":
                    pw = PasswordGenerator.generateAPIKey(getAPIKeyOpts());
                    break;
                default:
                    pw = PasswordGenerator.generatePassword(getPasswordOpts());
            }
            if (pw) passwords.push(pw);
        }

        if (!passwords.length) {
            ToastManager.show("Select at least one character set!", "error");
            els.output.style.animation = "shake 0.4s ease";
            els.output.addEventListener(
                "animationend",
                () => (els.output.style.animation = ""),
                { once: true },
            );
            return;
        }

        currentPassword = passwords[0];
        els.output.textContent = currentPassword;
        updateStrength(currentPassword);

        // Animate generate button
        const btn =
            currentMode === "password"
                ? $("#btn-generate")
                : currentMode === "passphrase"
                  ? $("#btn-generate-pp")
                  : currentMode === "pin"
                    ? $("#btn-generate-pin")
                    : $("#btn-generate-api");
        btn.classList.add("generating");
        btn.addEventListener(
            "animationend",
            () => btn.classList.remove("generating"),
            { once: true },
        );

        // Multi output
        if (count > 1) {
            els.multiOutput.hidden = false;
            renderMultiList(passwords);
        } else {
            els.multiOutput.hidden = true;
        }

        // Settings-driven actions
        const settings = StorageManager.getSettings();
        if (settings.autoCopy) copyToClipboard(currentPassword);
        if (settings.saveHistory) {
            passwords.forEach((p) => StorageManager.addHistory(p));
        }

        if (settings.sound) playClickSound();
    }

    function getPasswordOpts() {
        return {
            length: parseInt(els.lengthSlider.value, 10),
            lower: els.optLower.checked,
            upper: els.optUpper.checked,
            digits: els.optDigits.checked,
            symbols: els.optSymbols.checked,
            excludeSimilar: els.optExcludeSimilar.checked,
            noRepeat: els.optNoRepeat.checked,
            easyRead: els.optEasyRead.checked,
        };
    }

    function getPassphraseOpts() {
        return {
            words: parseInt(els.ppWords.value, 10),
            separator: els.ppSeparator.value,
            style: els.ppStyle.value,
            addNumber: els.ppAddNumber.checked,
            addSymbol: els.ppAddSymbol.checked,
        };
    }

    function getPINOpts() {
        return {
            length: parseInt(els.pinLength.value, 10),
            noRepeat: els.pinNoRepeat.checked,
            noSequential: els.pinNoSequential.checked,
        };
    }

    function getAPIKeyOpts() {
        return {
            segments: parseInt(els.apiSegments.value, 10),
            segLength: parseInt(els.apiSegLength.value, 10),
            charset: els.apiCharset.value,
        };
    }

    /* ---- Strength update ---- */
    function updateStrength(pw) {
        const result = StrengthAnalyzer.analyze(pw);
        const section = $(".strength-section");

        // Remove old classes
        section.className = "strength-section";
        if (result.level) section.classList.add(`strength-${result.level}`);

        els.strengthBar.style.width = result.percent + "%";
        els.strengthBar.setAttribute("aria-valuenow", result.percent);
        els.strengthLabel.textContent = result.label;
        els.entropyValue.textContent = result.entropy
            ? `${result.entropy} bits`
            : "";

        // Suggestions
        const tips = SmartSuggestions.suggest(result);
        if (tips.length) {
            els.suggestions.hidden = false;
            els.suggestions.innerHTML = tips
                .map((t) => `<span class="suggestion-tag">${t}</span>`)
                .join("");
        } else {
            els.suggestions.hidden = true;
            els.suggestions.innerHTML = "";
        }
    }

    /* ---- Multi-list ---- */
    function renderMultiList(passwords) {
        els.multiList.innerHTML = passwords
            .map(
                (pw, i) => `
      <div class="multi-item" style="animation-delay:${i * 50}ms">
        <span class="multi-item-text">${escapeHtml(pw)}</span>
        <button class="action-btn" aria-label="Copy" title="Copy" data-copy="${escapeAttr(pw)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>`,
            )
            .join("");

        els.multiList.querySelectorAll("[data-copy]").forEach((btn) => {
            btn.addEventListener("click", () =>
                copyToClipboard(btn.dataset.copy),
            );
        });
    }

    /* ---- Copy ---- */
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            ToastManager.show("Copied to clipboard!", "success");
        } catch {
            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            ToastManager.show("Copied to clipboard!", "success");
        }
    }

    /* ---- Panels ---- */
    function openPanel(panel) {
        closeAllPanels();
        panel.hidden = false;
        els.overlay.hidden = false;
        requestAnimationFrame(() => {
            panel.classList.add("open");
            els.overlay.classList.add("visible");
        });
    }

    function closeAllPanels() {
        [els.historyPanel, els.favoritesPanel, els.settingsPanel].forEach(
            (p) => {
                p.classList.remove("open");
                setTimeout(() => {
                    p.hidden = true;
                }, 350);
            },
        );
        els.overlay.classList.remove("visible");
        setTimeout(() => {
            els.overlay.hidden = true;
        }, 300);
    }

    /* ---- History rendering ---- */
    function renderHistory() {
        const items = StorageManager.getHistory();
        if (!items.length) {
            els.historyList.innerHTML =
                '<li class="empty-state">No history yet.</li>';
            return;
        }
        els.historyList.innerHTML = items
            .map(
                (item) => `
      <li class="panel-list-item">
        <span class="panel-list-item-text">${escapeHtml(item.value)}</span>
        <span class="panel-list-item-time">${formatTime(item.time)}</span>
        <button class="icon-btn" aria-label="Copy" title="Copy" data-copy="${escapeAttr(item.value)}">📋</button>
      </li>`,
            )
            .join("");
        els.historyList
            .querySelectorAll("[data-copy]")
            .forEach((btn) =>
                btn.addEventListener("click", () =>
                    copyToClipboard(btn.dataset.copy),
                ),
            );
    }

    /* ---- Favorites rendering ---- */
    function renderFavorites() {
        const items = StorageManager.getFavorites();
        if (!items.length) {
            els.favoritesList.innerHTML =
                '<li class="empty-state">No favorites yet.</li>';
            return;
        }
        els.favoritesList.innerHTML = items
            .map(
                (item) => `
      <li class="panel-list-item">
        <span class="panel-list-item-text">${escapeHtml(item.value)}</span>
        <button class="icon-btn" aria-label="Copy" title="Copy" data-copy="${escapeAttr(item.value)}">📋</button>
        <button class="icon-btn" aria-label="Remove" title="Remove" data-remove-fav="${escapeAttr(item.value)}">🗑️</button>
      </li>`,
            )
            .join("");
        els.favoritesList
            .querySelectorAll("[data-copy]")
            .forEach((btn) =>
                btn.addEventListener("click", () =>
                    copyToClipboard(btn.dataset.copy),
                ),
            );
        els.favoritesList.querySelectorAll("[data-remove-fav]").forEach((btn) =>
            btn.addEventListener("click", () => {
                StorageManager.removeFavorite(btn.dataset.removeFav);
                renderFavorites();
                ToastManager.show("Removed from favorites", "info");
            }),
        );
    }

    /* ---- Analyzer ---- */
    function runAnalyzer() {
        const pw = els.analyzerInput.value;
        if (!pw) {
            els.analyzerResult.hidden = true;
            return;
        }
        const result = StrengthAnalyzer.analyze(pw);
        const d = result.details;
        els.analyzerResult.hidden = false;
        els.analyzerResult.innerHTML = `
      <div class="metric"><span class="metric-label">Strength</span><span class="metric-value" style="color:var(--strength-${result.level})">${result.label} (${result.score}/100)</span></div>
      <div class="metric"><span class="metric-label">Entropy</span><span class="metric-value">${result.entropy} bits</span></div>
      <div class="metric"><span class="metric-label">Length</span><span class="metric-value">${d.length}</span></div>
      <div class="metric"><span class="metric-label">Unique chars</span><span class="metric-value">${d.uniqueChars}</span></div>
      <div class="metric"><span class="metric-label">Pool size</span><span class="metric-value">${d.poolSize}</span></div>
      <div class="metric"><span class="metric-label">Lowercase</span><span class="metric-value">${d.hasLower ? "✓" : "✗"}</span></div>
      <div class="metric"><span class="metric-label">Uppercase</span><span class="metric-value">${d.hasUpper ? "✓" : "✗"}</span></div>
      <div class="metric"><span class="metric-label">Digits</span><span class="metric-value">${d.hasDigit ? "✓" : "✗"}</span></div>
      <div class="metric"><span class="metric-label">Symbols</span><span class="metric-value">${d.hasSymbol ? "✓" : "✗"}</span></div>
      <div class="metric"><span class="metric-label">Repeated chars</span><span class="metric-value">${d.hasRepeat ? "⚠ Yes" : "✓ No"}</span></div>
      <div class="metric"><span class="metric-label">Sequences</span><span class="metric-value">${d.hasSequence ? "⚠ Yes" : "✓ No"}</span></div>
    `;
        // Also show suggestions
        const tips = SmartSuggestions.suggest(result);
        if (tips.length) {
            els.analyzerResult.innerHTML += `<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px">${tips.map((t) => `<span class="suggestion-tag">${t}</span>`).join("")}</div>`;
        }
    }

    /* ---- Settings sync ---- */
    function loadSettings() {
        const s = StorageManager.getSettings();
        els.setAutoCopy.checked = s.autoCopy;
        els.setSaveHistory.checked = s.saveHistory;
        els.setSound.checked = s.sound;
    }

    function saveSettings() {
        StorageManager.setSettings({
            autoCopy: els.setAutoCopy.checked,
            saveHistory: els.setSaveHistory.checked,
            sound: els.setSound.checked,
        });
    }

    /* ---- Presets ---- */
    function applyPreset(name) {
        switch (name) {
            case "ultraSecure":
                els.lengthSlider.value = 32;
                els.lengthValue.textContent = "32";
                els.optLower.checked = true;
                els.optUpper.checked = true;
                els.optDigits.checked = true;
                els.optSymbols.checked = true;
                els.optExcludeSimilar.checked = false;
                els.optNoRepeat.checked = false;
                els.optEasyRead.checked = false;
                break;
            case "memorable":
                els.lengthSlider.value = 12;
                els.lengthValue.textContent = "12";
                els.optLower.checked = true;
                els.optUpper.checked = true;
                els.optDigits.checked = true;
                els.optSymbols.checked = false;
                els.optExcludeSimilar.checked = true;
                els.optNoRepeat.checked = false;
                els.optEasyRead.checked = true;
                break;
            case "numeric":
                els.lengthSlider.value = 8;
                els.lengthValue.textContent = "8";
                els.optLower.checked = false;
                els.optUpper.checked = false;
                els.optDigits.checked = true;
                els.optSymbols.checked = false;
                els.optExcludeSimilar.checked = false;
                els.optNoRepeat.checked = false;
                els.optEasyRead.checked = false;
                break;
        }
        ToastManager.show(`Preset applied: ${name}`, "info");
    }

    /* ---- Mode switching ---- */
    function switchMode(mode) {
        currentMode = mode;
        // Update tabs
        $$(".tab").forEach((t) => {
            const isActive = t.dataset.mode === mode;
            t.classList.toggle("active", isActive);
            t.setAttribute("aria-selected", isActive);
        });
        // Show/hide panels
        $$(".config-panel").forEach((p) => (p.hidden = true));
        const panelId = `panel-${mode}`;
        const panel = $(`#${panelId}`);
        if (panel) panel.hidden = false;

        // Hide multi-output on mode switch
        els.multiOutput.hidden = true;

        // If not password mode, hide count (only password supports multi)
        if (mode !== "password") {
            els.countInput.closest(".control-group").style.display = "none";
        } else {
            els.countInput.closest(".control-group").style.display = "";
        }
    }

    /* ---- Export history ---- */
    function exportHistory() {
        const h = StorageManager.getHistory();
        if (!h.length) {
            ToastManager.show("Nothing to export", "error");
            return;
        }
        const text = h
            .map((e) => `${e.value}\t${new Date(e.time).toISOString()}`)
            .join("\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ciphermint-history.txt";
        a.click();
        URL.revokeObjectURL(url);
        ToastManager.show("History exported!", "success");
    }

    /* ---- Sound ---- */
    function playClickSound() {
        try {
            const ctx = new (
                window.AudioContext || window.webkitAudioContext
            )();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = "sine";
            gain.gain.value = 0.08;
            osc.start();
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + 0.15,
            );
            osc.stop(ctx.currentTime + 0.15);
        } catch {
            /* no audio support */
        }
    }

    /* ---- Utilities ---- */
    function escapeHtml(str) {
        const div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    function escapeAttr(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function formatTime(ts) {
        const d = new Date(ts);
        const now = new Date();
        if (d.toDateString() === now.toDateString()) {
            return d.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        return d.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    /* ---- Event binding ---- */
    function bindEvents() {
        // Generate buttons
        $("#btn-generate").addEventListener("click", generate);
        $("#btn-generate-pp").addEventListener("click", generate);
        $("#btn-generate-pin").addEventListener("click", generate);
        $("#btn-generate-api").addEventListener("click", generate);

        // Copy, refresh, fav
        $("#btn-copy").addEventListener("click", () => {
            if (currentPassword) copyToClipboard(currentPassword);
        });
        $("#btn-refresh").addEventListener("click", generate);
        $("#btn-fav").addEventListener("click", () => {
            if (!currentPassword || currentPassword === "Click Generate")
                return;
            const added = StorageManager.addFavorite(currentPassword);
            ToastManager.show(
                added ? "Added to favorites!" : "Already in favorites",
                added ? "success" : "info",
            );
        });

        // Theme
        $("#btn-theme").addEventListener("click", () => {
            const next = ThemeManager.toggle();
            ToastManager.show(
                `${next === "dark" ? "Dark" : "Light"} mode`,
                "info",
            );
        });

        // Tabs
        $$(".tab").forEach((tab) =>
            tab.addEventListener("click", () => switchMode(tab.dataset.mode)),
        );

        // Sliders
        els.lengthSlider.addEventListener("input", () => {
            els.lengthValue.textContent = els.lengthSlider.value;
        });
        els.ppWords.addEventListener("input", () => {
            els.ppWordsValue.textContent = els.ppWords.value;
        });
        els.pinLength.addEventListener("input", () => {
            els.pinLengthValue.textContent = els.pinLength.value;
        });

        // Presets
        $$(".preset-btn").forEach((btn) =>
            btn.addEventListener("click", () =>
                applyPreset(btn.dataset.preset),
            ),
        );

        // Panels open/close
        $("#btn-history").addEventListener("click", () => {
            renderHistory();
            openPanel(els.historyPanel);
        });
        $("#btn-favorites").addEventListener("click", () => {
            renderFavorites();
            openPanel(els.favoritesPanel);
        });
        $("#btn-settings").addEventListener("click", () => {
            loadSettings();
            openPanel(els.settingsPanel);
        });

        $("#btn-close-history").addEventListener("click", closeAllPanels);
        $("#btn-close-favorites").addEventListener("click", closeAllPanels);
        $("#btn-close-settings").addEventListener("click", closeAllPanels);
        els.overlay.addEventListener("click", closeAllPanels);

        // History/Favorites clear
        $("#btn-clear-history").addEventListener("click", () => {
            StorageManager.clearHistory();
            renderHistory();
            ToastManager.show("History cleared", "info");
        });
        $("#btn-clear-favorites").addEventListener("click", () => {
            StorageManager.clearFavorites();
            renderFavorites();
            ToastManager.show("Favorites cleared", "info");
        });

        // Settings
        els.setAutoCopy.addEventListener("change", saveSettings);
        els.setSaveHistory.addEventListener("change", saveSettings);
        els.setSound.addEventListener("change", saveSettings);
        $("#btn-reset-settings").addEventListener("click", () => {
            StorageManager.resetSettings();
            loadSettings();
            ToastManager.show("Settings reset", "info");
        });
        $("#btn-export-history").addEventListener("click", exportHistory);

        // Analyzer
        $("#btn-analyze").addEventListener("click", runAnalyzer);
        els.analyzerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") runAnalyzer();
        });

        // Keyboard shortcut: Ctrl+G or Cmd+G to generate
        document.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "g") {
                e.preventDefault();
                generate();
            }
        });
    }

    /* ---- Init ---- */
    function init() {
        cacheElements();
        ThemeManager.init();
        loadSettings();
        bindEvents();
        switchMode("password");
        // Auto-generate first password
        generate();
    }

    return { init };
})();

/* ================================================
   BOOT
   ================================================ */
document.addEventListener("DOMContentLoaded", UI.init);
