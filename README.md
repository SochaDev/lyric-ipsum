# Lorem Ipsum

A demo project that uses headless Drupal 8 and an AngularJS client to generate truly awesome lorem ipsum copy. 

For dev purposes, set your docroot to use the `server` directory; log in to Drupal at the site root. Then add a symlink to access http://localhost/client stuff: `ln -s ../client server/client`

## Spec

    * Song A
      * Killer lyric 1
      * Killer lyric 2
      * Killer lyric 3
    * Song B
      * Killer lyric 1
      * Killer lyric 2
      * Killer lyric 3
    * Song C
      * Killer lyric 1
      * Killer lyric 2
      * Killer lyric 3
    * Song D
      * Killer lyric 1
      * Killer lyric 2
      * Killer lyric 3

* Server `/api/songs` GET endpoint yields all songs and all lyrics.
* Client randomly selects subset of songs.
* Client randomizes lyrics from song list and writes a new song using lyrics that don't make any sense together.
* Client prints freshly penned random song.
* Client prompts user to have another random new DM song written.

