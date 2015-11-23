/**
 * Code for the artist module.
 */

(function () {

  'use strict';

  // Controller to handle main template.
  var ControllerTemplate = ['$rootScope', '$scope', '$http', 'appConfig',
    function($rootScope, $scope, $http, appConfig) {

      // Template vars.
      $rootScope.reset = false;

      // Fetch app artists data.
      if (!$rootScope.artists) {
        $http
          .get(appConfig.apiRoot + '/artists', {})
          .then(function(response) {
            if (response.status !== 200) {
              // TODO: handle errors.
              return false;
            }
            $rootScope.artists = response.data;
            $rootScope.artist = $rootScope.artists[0];
          });
      }

      // Function to set the global artist object.
      $scope.setArtist = function(artist) {
        $rootScope.artist = artist;
        $rootScope.reset = true;
      };

    }];

  // Bind the module.
  angular
    .module('artist', [
    ])
    .controller('controllerTemplate', ControllerTemplate)

})();
