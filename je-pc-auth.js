System.register([], function (_export) {
  'use strict';
  var TOKEN = 'mock-token-' + Date.now();
  var user = { id: 1, name: 'Test User', email: 'test@test.com', restaurantId: 1 };
  var Auth = function() {};
  Auth.prototype = {
    constructor: Auth,
    init: function() { return Promise.resolve(); },
    authenticate: function() { return Promise.resolve(); },
    checkAndAuthorizeUser: function() { return Promise.resolve({ authorized: true }); },
    getUserInfo: function() { return Promise.resolve(user); },
    getValidToken: function() { return Promise.resolve(TOKEN); },
    getRestaurantId: function() { return 1; },
    isAuthorized: function() { return true; },
    logout: function() { return Promise.resolve(); },
    forget: function() {},
    requestLogout: function() { return Promise.resolve(); },
    selectUserRestaurant: function() { return Promise.resolve(); },
    subscribeToUserUpdates: function() { return function() {}; },
    fetchUserRestaurantsList: function() { return Promise.resolve([{id:1,name:'Test'}]); },
    tokenTypesConfig: { accessToken: 'access_token', idToken: 'id_token' }
  };
  var instance = new Auth();
  _export({
    default: instance,
    authenticate: instance.authenticate,
    checkAndAuthorizeUser: instance.checkAndAuthorizeUser,
    getUserInfo: instance.getUserInfo,
    getValidToken: instance.getValidToken,
    init: instance.init,
    logout: instance.logout,
    isAuthorized: instance.isAuthorized,
    getRestaurantId: instance.getRestaurantId
  });
});
