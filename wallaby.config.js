const wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config.js');

webpackConfig.entryPatterns = ['src/**/*.spec.js'];

module.exports = function() {
  return {
    debug: true,
    files: [
      {pattern: 'src/**/*.html', load: false},
      {pattern: 'src/**/*.scss', load: false},
      {pattern: 'config/beforeEachTest.js', load: false},
      {pattern: 'src/**/*.ts', load: false},
      {pattern: 'src/**/*.spec.ts', ignore: true}
    ],
    tests: [
      {pattern: 'src/**/*.spec.ts', load: false}
    ],
    postprocessor: wallabyWebpack(webpackConfig),
    env: {
      kind: 'electron'
    },
    testFramework: 'jasmine',
    bootstrap: function() {
      window.__moduleBundler.loadTests();
    }
  }
};
