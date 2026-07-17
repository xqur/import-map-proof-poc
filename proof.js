/**
 * proof.js — Harmless Proof of Concept
 * Security research artifact for import map override demonstration.
 *
 * This file is NOT malicious. It does NOT:
 * - Collect cookies or personal data
 * - Access user credentials or sessions
 * - Make any network requests
 * - Exfiltrate any information
 * - Perform any side effects beyond console + alert
 */

(function() {
    'use strict';

    // Console proof
    console.log('%c[PoC] Import map override proof: external JavaScript executed successfully', 'color: #00aa00; font-weight: bold;');

    // Visual proof — only if we're in a browser environment
    if (typeof window !== 'undefined' && window.alert) {
        // Use setTimeout so the console message appears first
        setTimeout(function() {
            window.alert('PoC successful: external JavaScript module executed');
        }, 100);
    }
})();

export {};
