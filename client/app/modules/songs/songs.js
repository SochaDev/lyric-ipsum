/**
 * Code for the songs module.
 */

(function () {

  'use strict';

  // Directive to handle input tasks.
  var DirectiveInput = [
    function() {
      return {
        templateUrl: 'app/modules/songs/songs.html',
        controller: ['$rootScope', '$scope', '$window', 'appConfig',
          function($rootScope, $scope, $window, appConfig) {

            // console.log(appConfig);

          }]
      };
    }];

  // Bind the module.
  angular
    .module('songs', [
    ])
    .directive('songs', DirectiveInput);

})();
