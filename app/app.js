/**
 * Code for the app module.
 */

(function () {

  'use strict';

  var appConfig = {
    name: 'loremipsum',
    apiRoot: 'http://lyric-ipsum.sochadev.com/api',
    lyricDelimiter: '|'
  };

  // Bind the module.
  angular
    .module(appConfig.name, [
      'ngSanitize',
      'ngAnimate',
      'artist',
      'songs'
    ])
    .constant('appConfig', appConfig)

})();
