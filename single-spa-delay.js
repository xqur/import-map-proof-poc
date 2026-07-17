System.register(["single-spa"], function (_export) {
  'use strict';
  var singleSpa;
  return {
    setters: [function(m) { singleSpa = m.default || m; }],
    execute: function () {
      var origStart = singleSpa.start.bind(singleSpa);
      singleSpa.start = function(cfg) {
        console.log('%c⏳ Delaying single-spa.start to apply overrides...','color:orange');
        setTimeout(function() {
          console.log('%c🚀 Starting single-spa now','color:green');
          origStart(cfg);
        }, 2000);
        return singleSpa;
      };
      _export({ default: singleSpa });
    }
  };
});
