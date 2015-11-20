/**
 * Code for the app module.
 */

(function () {

  'use strict';

  var appConfig = {
    name: 'loremipsum',
    apiRoot: 'http://' + document.location.hostname + '/api'
  };

  // Bind the module.
  angular
    .module(appConfig.name, [
      'ngSanitize',
      'ngAnimate',
      'songs'
    ])
    .constant('appConfig', appConfig)

})();
