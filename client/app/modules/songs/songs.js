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

            // Function to return only unique values from an array.
            $scope.unique = function(value, index, self) {
              return (self.indexOf(value) === index);
            };

            // Function to randomize an array.
            $scope.shuffle = function(array) {
              var currentIndex = array.length, temporaryValue, randomIndex;

              // While there remain elements to shuffle...
              while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }

              return array;
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

                  var songs = $scope.shuffle(response.data);
                  angular.forEach(songs, function(song, ixSong) {
                    $scope.artist.push(song.artist);
                    $scope.songs.push(song.title);

                    $scope.artist = $scope.artist.filter($scope.unique);

                    var lyrics = song.lyrics.split(appConfig.lyricDelimiter);
                    angular.forEach(lyrics, function(lyric, ixLyric) {
                      $scope.song.push(lyric);
                    });

                    $scope.shuffle($scope.song);
                  });

                  $scope.shuffle($scope.song);
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
