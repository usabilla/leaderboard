# Leaderboard

An offline game basically suitable for any game that orders results according to time. A player performs an
activity and when the activity is completed player hits space and time is registered. We actually had
a buzzer that would simulate a space click :)

The game was developed for high resolution and for people to be able to see it clearly from far away.

Install node modules

```bash
$ yarn
```

To build game for production (currently only for darwin)

```bash
$ yarn package
```

`out/Leaderboard-darwin-x64` contains the electron application, which you can then distribute.

For development

```bash
$ yarn start
```

The game is built with

- [TypeScript](https://www.typescriptlang.org/)
- [AngularJS](https://angularjs.org/)
- [Electron](http://electron.atom.io/)
- [Uikit](http://getuikit.com/)
- [PouchDB](https://pouchdb.com/)
- [Webpack](https://webpack.js.org/)

and several other awesome packages!
