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
        controller: ['$rootScope', '$scope', '$http', 'appConfig',
          function($rootScope, $scope, $http, appConfig) {

            // Template variables.
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
              $rootScope.reset = false;
              $scope.noSongs = false;
              $scope.songs = [];
              $scope.song = [];

              // Fetch the songs.
              $http
                .get(appConfig.apiRoot + '/songs?artist=' + $rootScope.artist.id, {})
                .then(function(response) {
                  if (response.status !== 200 || response.data.length === 0) {
                    // TODO: handle errors.

                    $scope.noSongs = true;
                    return false;
                  }

                  // Randomize songs.
                  var songs = _.sample(response.data, 30);

                  // Loop songs and populate template vars.
                  _.forEach(songs, function(song) {
                    song.title = _.unescape(song.title);
                    song.title = song.title.replace('&#039;', "'");
                    $scope.songs.push( _.unescape(song.title) );

                    var lyrics = song.lyrics.split(appConfig.lyricDelimiter);

                    _.forEach(lyrics, function(lyric) {
                      lyric = _.unescape(lyric);
                      lyric = lyric.replace('&#039;', "'");
                      lyric = _.trim(lyric);
                      $scope.song.push( lyric );
                    });
                  });

                  // Randomize generated song.
                  $scope.song = _.sample($scope.song, 30);
                })
                .then(function() {
                  var lyricsTmp = $scope.song;

                  if ($scope.mode === 'paragraph') {
                    // Handle "paragraph" mode.
                    var paragraphs = [];

                    _.times($scope.count, function(n) {
                      var lines = _.sample(lyricsTmp, _.random(1, 20));
                      var sentences = [];

                      _.forEach(lines, function(line) {
                        // Append period if this line does not already have trailing punctuation.
                        if (!(_.endsWith(line, '.') || _.endsWith(line, '?') ||  _.endsWith(line, '!'))) {
                          line = line + '.';
                        }

                        sentences.push(line);
                      });

                      paragraphs.push('<p>' + sentences.join(' ') + '</p>');
                    });

                    $scope.song = paragraphs;
                  }
                  else {
                    // Handle "lyrics" mode.
                    var song = [];
                    var lines = _.sample(lyricsTmp, 16);

                    _.forEach(lines, function(line) {
                      song.push('<p>' + line + '</p>');
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
