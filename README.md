# Leaderboard

This offline game is basically suitable for any game that orders results according to time. A player performs an
activity and when the activity is completed player hits space and time is registered. We actually had
a buzzer that would simulate a space click :)

The game was developed for high resolution and for people to be able to see it clearly from far away.

Install node modules

```sh
$ npm i
```

To build game for production (currently only for darwin)

```sh
$ npm run package
```

`Leaderboard-darwin-x64` contains the electron application, which you can then distribute.

For development

```sh
$ npm start
```

Adding any sound/song in `src/sounds` with the filename `play.mp3`, you can have a song on the background
while users are playing. Additionally you need to add this line

```javascript
'play': ngAudio.load('sounds/play.mp3')
```

in [game service](src/js/services/game.service.js) so the sound can be played at runtime. As an extra
you can download the result data in csv format.

The game is built with

- [AngularJS](https://angularjs.org/)
- [Electron](http://electron.atom.io/)
- [Uikit](http://getuikit.com/)
- [PouchDB](https://pouchdb.com/)

and several other awesome packages!
