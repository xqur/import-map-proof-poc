/**
 * proof.js — Harmless Proof of Concept
 * Security research artifact for import map override demonstration.
 *
 * SystemJS.register() format with export for single-spa microfrontend compatibility.
 *
 * This file is NOT malicious. It does NOT:
 *   - Collect cookies or personal data
 *   - Access user credentials or sessions
 *   - Make any network requests
 *   - Exfiltrate any information
 *   - Perform any side effects beyond console + alert
 */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      console.log('%c[PoC] Import map override proof: external JavaScript executed successfully', 'color: #00aa00; font-weight: bold;');

      if (typeof window !== 'undefined' && window.alert) {
        window.setTimeout(function () {
          window.alert('PoC successful: external JavaScript module executed');
        }, 100);
      }

      _export({
        default: {}
      });
    }
  };
});
