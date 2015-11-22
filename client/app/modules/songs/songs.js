/**
 * Code for the songs module.
 */

(function () {

  'use strict';

  // Directive to handle output.
  var DirectiveOutput = [
    function() {
         return {
        templateUrl: 'app/modules/songs/output.html',
        controller: ['$scope', '$http', 'appConfig',
          function($scope, $http, appConfig) {

            // Template variables.
            $scope.artist = [];
            $scope.songs = [];
            $scope.song = [];
            $scope.mode = 'paragraph';
            $scope.count = 5;

            // Function to set generate mode.
            $scope.setMode = function(value) {
              $scope.mode = value;
              $scope.song = [];
            };

            // Function to set "paragraph" mode count.
            $scope.setCount = function(value) {
              $scope.count = value;
            };

            // Function to generate a random song.
            $scope.generate = function() {

              // Reset template variables.
              $scope.artist = [];
              $scope.songs = [];
              $scope.song = [];

              // Fetch the songs.
              $http
                .get(appConfig.apiRoot + '/songs', {})
                .then(function(response) {
                  if (response.status !== 200) {
                    // TODO: handle errors.
                    return false;
                  }

                  // Randomize songs.
                  var songs = _.sample( response.data, 30);

                  // Loop songs and populate template vars.
                  _.forEach(songs, function(song) {
                    $scope.artist.push(song.artist);
                    $scope.songs.push(song.title);

                    var lyrics = song.lyrics.split(appConfig.lyricDelimiter);
                    var lcount = 0;

                    _.forEach(lyrics, function(lyric) {
                      $scope.song.push(lyric);
                    });
                  });

                  // Make song artist(s) unique.
                  $scope.artist = _.unique($scope.artist);

                  // Randomize generated song.
                  $scope.song = _.sample($scope.song, 30);
                })
                .then(function() {
                  // Handle "paragraph" mode.
                  if ($scope.mode != 'lyrics') {
                    var songTmp = $scope.song;
                    var song = [];

                    _.times($scope.count, function(n) {
                      var songProc = _.sample(songTmp, _.random(1,20));
                      song.push('<p>' + songProc.join('. ') + '.</p>');
                    });

                    $scope.song = song;
                  }
                });

            };

          }]
      };
    }];

  // Bind the module.
  angular
    .module('songs', [
    ])
    .directive('output', DirectiveOutput);

})();
