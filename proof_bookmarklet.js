/** proof_bookmarklet.js — Visual PoC with alert, no console needed. 
 *  Used with: javascript:localStorage.setItem(...) bookmarklet */
System.register([], function (_export) {
  'use strict';
  return {
    setters: [],
    execute: function () {
      console.log('%c✅ IMO Bookmarklet PoC: Remote JS executed successfully','color:green;font-weight:bold');
      alert('IMO Bookmarklet PoC: Remote JavaScript executed successfully');
      _export({ default: {} });
    }
  };
});
