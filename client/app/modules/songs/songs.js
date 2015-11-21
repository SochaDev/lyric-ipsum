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
            $scope.mode = 'lyrics';
            $scope.count = 5;

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
                  var songs = $scope.shuffle(response.data);
                  // Loop songs and populate template vars.
                  angular.forEach(songs, function(song, ixSong) {
                    $scope.artist.push(song.artist);
                    $scope.songs.push(song.title);

                    var lyrics = song.lyrics.split(appConfig.lyricDelimiter);
                    angular.forEach(lyrics, function(lyric, ixLyric) {
                      $scope.song.push(lyric);
                    });
                  });

                  // Make song artist(s) unique.
                  $scope.artist = $scope.artist.filter($scope.unique);
                  // Randomize generated song.
                  $scope.song = $scope.shuffle($scope.song);
                })
                .then(function() {
                  // Handle "paragraph" mode.
                  if ($scope.mode !== 'lyrics') {
                    var songTmp = $scope.song;
                    var song = [];
                    for (var i=0; i < $scope.count; i++) {
                      songTmp = $scope.shuffle(songTmp);
                      song.push('<p>' + songTmp.join('. ') + '.</p>');
                    }

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
