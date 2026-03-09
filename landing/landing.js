/**
 * CipherMint Landing Page — Mini password generator preview
 */
"use strict";

(function () {
    const LOWER = "abcdefghijklmnopqrstuvwxyz";
    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const DIGITS = "0123456789";
    const SYMBOLS = "!@#$%^&*_+-=";
    const POOL = LOWER + UPPER + DIGITS + SYMBOLS;

    function randomInt(max) {
        const arr = new Uint32Array(1);
        crypto.getRandomValues(arr);
        return arr[0] % max;
    }

    function generate(len) {
        const chars = [];
        // Guarantee one from each set
        chars.push(LOWER[randomInt(LOWER.length)]);
        chars.push(UPPER[randomInt(UPPER.length)]);
        chars.push(DIGITS[randomInt(DIGITS.length)]);
        chars.push(SYMBOLS[randomInt(SYMBOLS.length)]);
        while (chars.length < len) {
            chars.push(POOL[randomInt(POOL.length)]);
        }
        // Shuffle
        for (let i = chars.length - 1; i > 0; i--) {
            const j = randomInt(i + 1);
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        return chars.join("");
    }

    function scorePassword(pw) {
        let pool = 0;
        if (/[a-z]/.test(pw)) pool += 26;
        if (/[A-Z]/.test(pw)) pool += 26;
        if (/[0-9]/.test(pw)) pool += 10;
        if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
        const entropy = pw.length * Math.log2(pool || 1);
        let score = Math.min(100, Math.round(entropy / 1.28));
        return score;
    }

    function labelForScore(s) {
        if (s < 30) return { text: "Weak", color: "#ff4d6a" };
        if (s < 55) return { text: "Fair", color: "#ffb84d" };
        if (s < 80) return { text: "Strong", color: "#00e59b" };
        return { text: "Ultra Secure", color: "#0077ff" };
    }

    const output = document.getElementById("preview-output");
    const bar = document.getElementById("preview-bar");
    const label = document.getElementById("preview-label");
    const btn = document.getElementById("preview-generate");

    btn.addEventListener("click", function () {
        const pw = generate(20);
        output.textContent = pw;
        const score = scorePassword(pw);
        const info = labelForScore(score);
        bar.style.width = score + "%";
        bar.style.background = info.color;
        label.textContent = info.text;
        label.style.color = info.color;
    });
})();
