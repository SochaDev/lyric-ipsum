/**
 * Code for the app module.
 */

(function () {

  'use strict';

  var appConfig = {
    name: 'lyricipsum',
    apiRoot: 'http://manage.lyric-ipsum.rocks/api',
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
