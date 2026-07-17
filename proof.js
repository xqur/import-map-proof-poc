/**
 * proof.js — Harmless Proof of Concept
 * Security research artifact for import map override demonstration.
 *
 * SystemJS.register() format for single-spa microfrontend architecture.
 * Compatible with SystemJS import map overrides.
 *
 * This file is NOT malicious. It does NOT:
 *   - Collect cookies or personal data
 *   - Access user credentials or sessions
 *   - Make any network requests
 *   - Exfiltrate any information
 *   - Perform any side effects beyond console + alert
 */
System.register([], function (_exports, _context) {
  'use strict';
  return {
    execute: function () {
      console.log('%c[PoC] Import map override proof: external JavaScript executed successfully', 'color: #00aa00; font-weight: bold;');

      if (typeof window !== 'undefined' && window.alert) {
        setTimeout(function () {
          window.alert('PoC successful: external JavaScript module executed');
        }, 100);
      }
    }
  };
});
