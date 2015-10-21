# ![alt tag](./src/images/smiley-crown.svg) Usabilla Balls of Fire

We developed this game for fun. [eCommerce](http://www.amsterdameweek.com/) attendees had the opportunity to experience it for real.

The game is basically suitable for any game that orders results according to time. A player performs an activity and when the activity is completed player hits space and time is registered. We actually had a buzzer that would simulate a space click :)

The game was developed for high resolution and for people to be able to see it clearly from far away.

Setup is as easy as

```sh
$ npm i
```

To build game for production

```sh
$ npm run build
```

`dist` contains all static files, which you can then distribute.

For development

```sh
$ npm run dev
```

which will spawn a webserver with livereload.

Adding any sound/song in `src/sounds` with the filename `play.mp3`, you can have a song on the background while users are playing. You need to add this line

```javascript
'play': ngAudio.load('sounds/play.mp3')
```

in [game service](src/js/services/game.service.js) so the sound can be played at runtime.

The game is built with [AngularJS](https://angularjs.org/), [Gulp](http://gulpjs.com/) and several awesome plugins.
