/**
 * proof.js — Harmless Proof of Concept
 * Security research artifact for import map override demonstration.
 *
 * Compatible with:
 *   - SystemJS (single-spa microfrontend architecture)
 *   - Native ES module import()
 *   - Regular <script> tag
 *
 * This file is NOT malicious. It does NOT:
 *   - Collect cookies or personal data
 *   - Access user credentials or sessions
 *   - Make any network requests
 *   - Exfiltrate any information
 *   - Perform any side effects beyond console + alert
 */

(function () {
    'use strict';

    function execute() {
        console.log('%c[PoC] Import map override proof: external JavaScript executed successfully', 'color: #00aa00; font-weight: bold;');

        if (typeof window !== 'undefined' && window.alert) {
            setTimeout(function () {
                window.alert('PoC successful: external JavaScript module executed');
            }, 100);
        }
    }

    // SystemJS detection: top-level System.register() for SystemJS module loader
    if (typeof System !== 'undefined' && typeof System.register === 'function') {
        System.register([], function (_exports, _context) {
            'use strict';
            return { execute: execute };
        });
    } else {
        // Native browser: execute immediately
        execute();
    }
})();

// ES module export — makes this a valid ES module for import()
export {};
