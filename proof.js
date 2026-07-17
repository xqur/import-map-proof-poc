/**
 * proof.js — Harmless Proof of Concept
 * Security research artifact for import map override demonstration.
 *
 * Works with both:
 *   - SystemJS (single-spa / microfrontend architecture)
 *   - Native ES module import()
 *
 * This file is NOT malicious. It does NOT:
 *   - Collect cookies or personal data
 *   - Access user credentials or sessions
 *   - Make any network requests
 *   - Exfiltrate any information
 *   - Perform any side effects beyond console + alert
 */

// SystemJS format — works with single-spa microfrontends
(function (factory) {
    if (typeof System !== 'undefined' && typeof System.register === 'function') {
        System.register([], function (_exports, _context) {
            return {
                execute: function () {
                    factory();
                }
            };
        });
    } else {
        // Fallback: run immediately for native <script> or dynamic import()
        factory();
    }
})(function () {
    'use strict';

    // Console proof
    console.log('%c[PoC] Import map override proof: external JavaScript executed successfully', 'color: #00aa00; font-weight: bold;');

    // Visual proof — only if we're in a browser environment
    if (typeof window !== 'undefined' && window.alert) {
        var oldAlert = window.alert;
        setTimeout(function () {
            oldAlert('PoC successful: external JavaScript module executed');
        }, 100);
    }
});

export {};
